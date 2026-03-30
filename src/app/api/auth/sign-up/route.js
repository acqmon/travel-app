import { NextResponse } from "next/server";
import sequelize from "@/server/db/sequelize";
import { User, PartnerProfile } from "@/server/models";
import { ROLE } from "@/constants/role.constant";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, role, partnerProfile } = body;

    // 1. Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const allowedRoles = [ROLE.CUSTOMER, ROLE.PARTNER];
    const userRole = allowedRoles.includes(role) ? role : ROLE.CUSTOMER;

    // 2. TRANSACTION
    const result = await sequelize.transaction(async (t) => {
      // Check existing user WITH LOCK (prevents race condition)
      const existingUser = await User.findOne({
        where: { email: normalizedEmail },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (existingUser) {
        throw new Error("Email already registered");
      }

      // 3. Create user
      const user = await User.create(
        {
          firstName,
          lastName,
          email: normalizedEmail,
          passwordHash: password, // hashed via hook
          role: userRole,
        },
        { transaction: t },
      );

      let createdPartnerProfile = null;

      // 4. Partner profile creation
      if (userRole === ROLE.PARTNER) {
        if (!partnerProfile) {
          throw new Error("Partner profile is required");
        }

        const {
          businessTypeId,
          businessName,
          phone,
          alternatePhone,
          contactEmail,
          website,
          gstNumber,
          panNumber,
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          zipCode,
        } = partnerProfile;

        // Required validation
        if (!businessTypeId || !businessName || !phone) {
          throw new Error(
            "businessTypeId, businessName and phone are required for partner",
          );
        }

        // Optional validations
        if (contactEmail && !/^\S+@\S+\.\S+$/.test(contactEmail)) {
          throw new Error("Invalid contact email format");
        }

        if (website && !/^https?:\/\/.+/.test(website)) {
          throw new Error("Invalid website URL");
        }

        // Safe creation (whitelisted fields only)
        createdPartnerProfile = await PartnerProfile.create(
          {
            userId: user.id,
            businessTypeId,
            businessName,
            phone,
            alternatePhone,
            contactEmail,
            website,
            gstNumber,
            panNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            zipCode,
          },
          { transaction: t },
        );
      }

      return { user, partnerProfile: createdPartnerProfile };
    });

    // 5. Response
    return NextResponse.json(
      {
        message: "User registered successfully",
        code: 201,
        data: {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          role: result.user.role,
          isActive: result.user.isActive,
          partnerProfile: result.partnerProfile
            ? {
                id: result.partnerProfile.id,
                businessName: result.partnerProfile.businessName,
                phone: result.partnerProfile.phone,
                isVerified: result.partnerProfile.isVerified,
              }
            : null,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    // Better error handling
    if (error.message.includes("required")) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error.message.includes("already")) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
