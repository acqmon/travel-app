--
-- PostgreSQL database dump
--

\restrict AB0i6Huh7dIMGz9yvpxAgHTdsVmD0YhGyhZ4gF5fhijN7nJEv4ogPearCafdg7L

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-19 16:27:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 24723)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 917 (class 1247 OID 24691)
-- Name: enum_partner_activities_status; Type: TYPE; Schema: public; Owner: amonteiro
--

CREATE TYPE public.enum_partner_activities_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_partner_activities_status OWNER TO amonteiro;

--
-- TOC entry 923 (class 1247 OID 24794)
-- Name: enum_partner_profiles_status; Type: TYPE; Schema: public; Owner: amonteiro
--

CREATE TYPE public.enum_partner_profiles_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_partner_profiles_status OWNER TO amonteiro;

--
-- TOC entry 896 (class 1247 OID 17335)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: amonteiro
--

CREATE TYPE public.enum_users_role AS ENUM (
    'customer',
    'partner',
    'admin'
);


ALTER TYPE public.enum_users_role OWNER TO amonteiro;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 24639)
-- Name: activities; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.activities (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.activities OWNER TO amonteiro;

--
-- TOC entry 225 (class 1259 OID 24666)
-- Name: activity_category_mappings; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.activity_category_mappings (
    id uuid NOT NULL,
    activity_id uuid NOT NULL,
    category_id uuid NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.activity_category_mappings OWNER TO amonteiro;

--
-- TOC entry 221 (class 1259 OID 24593)
-- Name: business_types; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.business_types (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category character varying(255),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.business_types OWNER TO amonteiro;

--
-- TOC entry 224 (class 1259 OID 24653)
-- Name: categories; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO amonteiro;

--
-- TOC entry 226 (class 1259 OID 24697)
-- Name: partner_activities; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.partner_activities (
    id uuid NOT NULL,
    partner_profile_id uuid NOT NULL,
    activity_id uuid NOT NULL,
    price numeric(10,2) NOT NULL,
    status public.enum_partner_activities_status DEFAULT 'pending'::public.enum_partner_activities_status,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.partner_activities OWNER TO amonteiro;

--
-- TOC entry 222 (class 1259 OID 24608)
-- Name: partner_profiles; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.partner_profiles (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    business_type_id uuid NOT NULL,
    "businessName" character varying(255) NOT NULL,
    description text,
    phone character varying(255) NOT NULL,
    alternate_phone character varying(255),
    contact_email character varying(255),
    website character varying(255),
    "gstNumber" character varying(255),
    pan_number character varying(255),
    address_line_1 character varying(255),
    address_line_2 character varying(255),
    city character varying(255),
    state character varying(255),
    country character varying(255),
    zip_code character varying(255),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    status public.enum_partner_profiles_status DEFAULT 'pending'::public.enum_partner_profiles_status
);


ALTER TABLE public.partner_profiles OWNER TO amonteiro;

--
-- TOC entry 220 (class 1259 OID 17375)
-- Name: users; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'customer'::public.enum_users_role NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    is_active boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO amonteiro;

--
-- TOC entry 5030 (class 0 OID 24639)
-- Dependencies: 223
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.activities (id, name, description, category, is_active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5032 (class 0 OID 24666)
-- Dependencies: 225
-- Data for Name: activity_category_mappings; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.activity_category_mappings (id, activity_id, category_id, is_active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5028 (class 0 OID 24593)
-- Dependencies: 221
-- Data for Name: business_types; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.business_types (id, name, description, category, is_active, created_at, updated_at) FROM stdin;
a5bae135-1b63-4adb-a534-ccfc03b8257a	Hotel	Accommodation for travelers including hotels and resorts	stay	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
fc2bdbef-a6de-4921-b4bb-a4a204195c9a	Homestay	Local home-based stay experience for travelers	stay	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
e4c7e144-9f4e-42dc-97f7-de1f40f08bd0	Resort	Luxury resorts offering premium stay and amenities	stay	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
d8f4eb13-9b5b-4f7f-bca2-37b8255dca02	Tour Operator	Organizes tours, packages, and travel itineraries	travel	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
e3adc5c9-1ff8-4ae8-b9fc-1e87e07583b9	Travel Agency	Provides travel booking and consultancy services	travel	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
bba4594b-ab84-4e88-b935-9164618de8b4	Cab / Taxi Service	Local and outstation transportation services	travel	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
de55e49b-7c3a-447f-ba39-6aa2a7530a11	Bike / Car Rental	Self-drive or rental vehicle services	travel	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
23c0642e-2ce5-4252-ac7d-7b274af10cdb	Adventure Activity Provider	Provides adventure activities like trekking, rafting, etc.	activity	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
c0aa013a-0136-48cc-8c27-41b00e70b1de	Event & Experience Organizer	Organizes events, local experiences, and tours	activity	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
246d650b-10f3-4acc-9347-ae430b7739b5	Guide Service	Professional tourist guides and local experts	activity	t	2026-04-05 09:03:47.541549+05:30	2026-04-05 09:03:47.541549+05:30
\.


--
-- TOC entry 5031 (class 0 OID 24653)
-- Dependencies: 224
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.categories (id, name, description, is_active, created_at, updated_at) FROM stdin;
2da4c0df-c7e9-4831-988f-58ce84d81477	Flights	All flight bookings including domestic and international	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
e6b991fa-1b79-4d51-ad9e-894d327ce7bc	Hotels	Accommodation options ranging from budget to luxury hotels	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
ff715e20-ff6b-4ea2-b7c8-fb389b77ad4c	Car Rentals	Vehicle rentals for traveling within destinations	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
218bba5c-53db-4d4c-8c36-d6823526780c	Tours & Activities	Guided tours, sightseeing, and adventure activities	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
efd37d53-6a34-4224-be5f-44e6aa25a108	Cruises	Luxury and leisure cruises for various destinations	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
39211ab6-a46d-4723-b6e0-741fc539986b	Travel Insurance	Insurance plans covering travel emergencies and health	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
e8771c48-acb6-4cd2-901f-c22fe0a75c05	Visa Services	Visa assistance and processing services for international travel	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
5cf7b466-172d-464a-b6f2-3becd26cfb16	Travel Gear	Luggage, backpacks, and essential travel accessories	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
5056e7e6-cb8f-4bae-9e48-cf7d3b00179f	Experiences	Unique local experiences like cooking classes and cultural events	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
cd661556-6bc6-4707-a3b2-4e24b54f3929	Packages	All-in-one travel packages including flights, hotels, and activities	t	2026-04-05 09:59:16.246784+05:30	2026-04-05 09:59:16.246784+05:30
\.


--
-- TOC entry 5033 (class 0 OID 24697)
-- Dependencies: 226
-- Data for Name: partner_activities; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.partner_activities (id, partner_profile_id, activity_id, price, status, is_active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5029 (class 0 OID 24608)
-- Dependencies: 222
-- Data for Name: partner_profiles; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.partner_profiles (id, user_id, business_type_id, "businessName", description, phone, alternate_phone, contact_email, website, "gstNumber", pan_number, address_line_1, address_line_2, city, state, country, zip_code, is_active, created_at, updated_at, status) FROM stdin;
def0a5c3-c1ee-4c3b-9d19-52e3ca25d430	799b01e6-6e23-4559-bd7e-d2790c5a56f1	d8f4eb13-9b5b-4f7f-bca2-37b8255dca02	Jhon Travels	We provide curated travel experiences, tours, and local activities across India.	9876543210	9876500000	contact@jhontravels.com	https://jhontravels.com	29ABCDE1234F1Z5	ABCDE1234F	MG Road	Near Metro Station	Bangalore	Karnataka	India	560001	t	2026-04-05 09:08:51.361+05:30	2026-04-05 09:08:51.361+05:30	pending
a09434ac-47ab-4de5-acfa-12cf77721919	8d70d9dd-d9a7-4e63-90fc-50eae14b4f8b	e4c7e144-9f4e-42dc-97f7-de1f40f08bd0	Helen Resorts	A resort is a vacation destination that offers lodging, dining, recreation, and relaxation facilities in a scenic or leisure-focused setting.	9976825423	1234567899	\N	https://helenresorts.com	GST123456789	PAN123456789	Lane no 1	street 41	Bangalore	Karnataka	India	560001	t	2026-04-12 19:53:04.561+05:30	2026-04-12 19:53:04.561+05:30	pending
49c98553-775a-4794-91de-40ba026bc71a	3bcfd1bb-ec1f-40f6-a6ad-3cdce6136cf7	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Sharma Tours	\N	9123456780	9988776655	info@sharmatours.com	https://sharmatours.com	29ABCDE1234F1Z6	ABCDE1234G	Brigade Road	Opp Mall	Bangalore	Karnataka	India	560002	t	2026-04-18 17:44:03.253+05:30	2026-04-18 17:44:03.253+05:30	pending
e8e328c6-df04-4293-954a-2fc596a8c2ae	2e028bc4-fa5e-45f0-91ec-f22b6cbd06fa	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Verma Logistics	\N	9876541230	9876501234	contact@vermalogistics.com	https://vermalogistics.com	27ABCDE1234F1Z7	ABCDE1234H	Andheri East	Near Station	Mumbai	Maharashtra	India	400069	t	2026-04-18 17:44:40.273+05:30	2026-04-18 17:44:40.273+05:30	pending
b2d9b6d7-566f-42a6-94bb-e8ddebf01da9	a843616e-9088-4b71-9bd5-74f291baee0c	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Reddy Travels	\N	9012345678	9090909090	hello@reddytravels.com	https://reddytravels.com	36ABCDE1234F1Z8	ABCDE1234J	Banjara Hills	Road No 5	Hyderabad	Telangana	India	500034	t	2026-04-18 17:44:48.007+05:30	2026-04-18 17:44:48.007+05:30	pending
79ee3e70-72e5-4838-8a54-a0cfc8be9a11	de093793-dab6-4f82-87d9-ed04d728bdf4	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Mehta Movers	\N	9345678901	9345600000	support@mehtamovers.com	https://mehtamovers.com	24ABCDE1234F1Z9	ABCDE1234K	SG Highway	Near Iskcon	Ahmedabad	Gujarat	India	380015	t	2026-04-18 17:44:55.886+05:30	2026-04-18 17:44:55.886+05:30	pending
1b8c21d8-eb57-4d06-9eb6-f94c10ae8481	e40b508f-a0ab-4229-8541-c84374d3a5c6	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Nair Holidays	\N	9898989898	9888888888	contact@nairholidays.com	https://nairholidays.com	32ABCDE1234F1Z1	ABCDE1234L	MG Road	Near Lulu Mall	Kochi	Kerala	India	682035	t	2026-04-18 17:45:03.088+05:30	2026-04-18 17:45:03.088+05:30	pending
9af88a9c-dc3c-4ae1-804d-091bfe6b6a9f	bf6a6016-4474-418a-82a3-944ac3734643	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Kapoor Cab Services	\N	9871234560	9871230000	info@kapoorcabs.com	https://kapoorcabs.com	07ABCDE1234F1Z2	ABCDE1234M	Connaught Place	Block A	Delhi	Delhi	India	110001	t	2026-04-18 17:45:10.295+05:30	2026-04-18 17:45:10.295+05:30	pending
ca7565fa-96d9-4ee9-9da4-4194bd7aef65	cb25254d-568a-4ada-b396-848ff1ff3aaa	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Gupta Travels	\N	9000000001	9000000002	hello@guptatravels.com	https://guptatravels.com	09ABCDE1234F1Z3	ABCDE1234N	Hazratganj	Near Park	Lucknow	Uttar Pradesh	India	226001	t	2026-04-18 17:45:18.495+05:30	2026-04-18 17:45:18.495+05:30	pending
c55e57c5-33f9-4a87-987c-0b294f84cbd6	035f067b-7c92-41cd-90ab-c1399c362ae4	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Singh Transport	\N	9111111111	9222222222	contact@singhtransport.com	https://singhtransport.com	10ABCDE1234F1Z4	ABCDE1234P	Patna Market	Main Road	Patna	Bihar	India	800001	t	2026-04-18 17:45:26.038+05:30	2026-04-18 17:45:26.038+05:30	pending
5895ad43-0c2d-42b0-8ff7-7b1c73733679	90b6ddaa-a82b-4b01-812b-8bad6afb4084	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Das Holidays	\N	9333333333	9444444444	info@dasholidays.com	https://dasholidays.com	19ABCDE1234F1Z5	ABCDE1234Q	Park Street	Near Metro	Kolkata	West Bengal	India	700016	t	2026-04-18 17:45:33.52+05:30	2026-04-18 17:45:33.52+05:30	pending
e579336c-8b9f-4ac2-bfc9-60fc5e14f195	830c82d2-3da4-42d6-b4f3-bddda2c7c669	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Iyer Travels	\N	9555555555	9666666666	contact@iyertravels.com	https://iyertravels.com	33ABCDE1234F1Z6	ABCDE1234R	T Nagar	Main Street	Chennai	Tamil Nadu	India	600017	t	2026-04-18 17:45:40.404+05:30	2026-04-18 17:45:40.404+05:30	pending
06baea64-9438-4ebf-9a81-4791faa3ef7d	c6fc13bc-8edc-492e-8c94-b59b2d1503e9	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Patil Transport	\N	9777777771	9777777772	info@patiltransport.com	https://patiltransport.com	27ABCDE1234F1Z8	ABCDE1234S	FC Road	Near College	Pune	Maharashtra	India	411004	t	2026-04-18 17:47:10.608+05:30	2026-04-18 17:47:10.608+05:30	pending
e62b074e-7fa4-4c65-a747-1d85df7d8ce2	cb40110a-ce3c-4555-ae0d-184f008a368f	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Yadav Logistics	\N	9666666661	9666666662	contact@yadavlogistics.com	https://yadavlogistics.com	06ABCDE1234F1Z9	ABCDE1234T	Sector 18	Near Market	Noida	Uttar Pradesh	India	201301	t	2026-04-18 17:47:16.152+05:30	2026-04-18 17:47:16.152+05:30	pending
c7bfe73b-038d-4af2-9dd2-27d64cc267de	e928cea0-339c-4e9c-93e9-6ed4376e6cf1	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Kumar Travels	\N	9555555551	9555555552	info@kumartravels.com	https://kumartravels.com	10ABCDE1234F1Z6	ABCDE1234U	Main Road	Near Bus Stand	Ranchi	Jharkhand	India	834001	t	2026-04-18 17:47:29.811+05:30	2026-04-18 17:47:29.811+05:30	pending
601e18d1-2b7b-45dc-bf09-b1473443d075	1bc54624-d3bd-46bf-ab31-7afc2d1e7c53	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Singh Tours	\N	9444444441	9444444442	contact@singhtours.com	https://singhtours.com	09ABCDE1234F1Z7	ABCDE1234V	Civil Lines	Near Court	Allahabad	Uttar Pradesh	India	211001	t	2026-04-18 17:47:35.629+05:30	2026-04-18 17:47:35.629+05:30	pending
49570f15-07db-46d3-9e12-df4bced64318	5c12d037-c195-4fd0-a19f-327aee885bda	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Jain Movers	\N	9333333331	9333333332	info@jainmovers.com	https://jainmovers.com	08ABCDE1234F1Z5	ABCDE1234W	MI Road	Near Circle	Jaipur	Rajasthan	India	302001	t	2026-04-18 17:47:42.473+05:30	2026-04-18 17:47:42.473+05:30	pending
f34ee931-6dd6-48e8-af01-6e59316113cd	a5ed6bb3-3aad-4393-b77e-5f7c74a32876	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Joshi Holidays	\N	9222222221	9222222222	contact@joshiholidays.com	https://joshiholidays.com	05ABCDE1234F1Z4	ABCDE1234X	Rajpur Road	Near Mall	Dehradun	Uttarakhand	India	248001	t	2026-04-18 17:47:50.007+05:30	2026-04-18 17:47:50.007+05:30	pending
6c5c9299-247b-4bcb-8ed9-3f525a5b6580	0d0f613c-8d94-4419-ac64-e78905396597	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Agarwal Logistics	\N	9111111112	9111111113	info@agarwallogistics.com	https://agarwallogistics.com	07ABCDE1234F1Z8	ABCDE1234Y	Karol Bagh	Near Metro	Delhi	Delhi	India	110005	t	2026-04-18 17:47:56.914+05:30	2026-04-18 17:47:56.914+05:30	pending
2f690b7a-b19e-4ca7-9225-331caca4f039	6f64af4a-5371-4dd1-ad38-a394470edc9f	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Kulkarni Travels	\N	9000000003	9000000004	contact@kulkarni.com	https://kulkarni.com	29ABCDE1234F1Z9	ABCDE1234Z	Jayanagar	4th Block	Bangalore	Karnataka	India	560041	t	2026-04-18 17:48:03.971+05:30	2026-04-18 17:48:03.971+05:30	pending
1a27598c-5ebb-4c07-9fd5-2cf8f8fa2d16	fde52396-dcb6-45f6-abaa-40c5ebdd0b06	23c0642e-2ce5-4252-ac7d-7b274af10cdb	Naik Transport	\N	9888888881	9888888882	info@naiktransport.com	https://naiktransport.com	30ABCDE1234F1Z1	ABCDE1235A	Panaji Road	Near Beach	Panaji	Goa	India	403001	t	2026-04-18 17:48:11.078+05:30	2026-04-18 17:48:11.078+05:30	pending
\.


--
-- TOC entry 5027 (class 0 OID 17375)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.users (id, "firstName", "lastName", email, password_hash, role, created_at, updated_at, is_active) FROM stdin;
cd385013-9752-4a60-8c72-44f737dfc45e	Acquin	Monteiro	amonteiro030@gmail.com	$2b$10$py4/Iz/nn.MrWKxo0OezNutxTiu6yOgSr0NSbOPh2PPN8ZjbsZlY.	customer	2026-04-04 19:37:54.053+05:30	2026-04-04 19:37:54.053+05:30	t
799b01e6-6e23-4559-bd7e-d2790c5a56f1	Jhon	Doe	jhon@gmail.com	$2b$10$Tybd5F1rVGydmi8ICg6awu4ZlYUDK7UlUbIYVtETsHJX.mTNdOFcm	partner	2026-04-05 09:08:50.995+05:30	2026-04-05 09:08:50.995+05:30	t
2a4ff268-58ad-4073-8c31-fee2f9d71637	Super	Admin	admin@mail.com	$2b$10$cuSwxKee.0KphrpLbLOxVOBrdlrfXF4nRxvstLriB0JQPtelj1XFW	admin	2026-04-05 09:35:37.805572+05:30	2026-04-05 09:35:37.805572+05:30	t
8d70d9dd-d9a7-4e63-90fc-50eae14b4f8b	Helen	Monteiro	helen@mail.com	$2b$10$VSS2idTw/3ySB58Y9D8EReJzaOMNIhh/6ZvVl6wOfoxlcb8vbjOV.	partner	2026-04-12 19:53:04.447+05:30	2026-04-12 19:53:04.447+05:30	t
3bcfd1bb-ec1f-40f6-a6ad-3cdce6136cf7	Amit	Sharma	amit.sharma@gmail.com	$2b$10$S7UgcnuXCl.GzNCkrj4Tt.btN9V1fFIvgddZ1Tm56GWwaitk5z4oO	partner	2026-04-18 17:44:03.105+05:30	2026-04-18 17:44:03.105+05:30	t
2e028bc4-fa5e-45f0-91ec-f22b6cbd06fa	Rahul	Verma	rahul.verma2@gmail.com	$2b$10$YXMpB3wyM9oXvuaDVl20CuOtjbHsfAA154mZFp6AEpBlOago6bkkO	partner	2026-04-18 17:44:40.127+05:30	2026-04-18 17:44:40.127+05:30	t
a843616e-9088-4b71-9bd5-74f291baee0c	Sneha	Reddy	sneha.reddy3@gmail.com	$2b$10$AcxuDb1dpKrhto6tUYxQG.NXEf/1.Ac0LlsLN.wjKPxFZ7ACV/vH6	partner	2026-04-18 17:44:47.86+05:30	2026-04-18 17:44:47.86+05:30	t
de093793-dab6-4f82-87d9-ed04d728bdf4	Karan	Mehta	karan.mehta4@gmail.com	$2b$10$jvU.XAAFiqww0ZW5uGkmeONGiej1JZboHiec.LiXe/2b3KW/Tgu12	partner	2026-04-18 17:44:55.739+05:30	2026-04-18 17:44:55.739+05:30	t
e40b508f-a0ab-4229-8541-c84374d3a5c6	Priya	Nair	priya.nair5@gmail.com	$2b$10$0uC6wnkEYAq8xpbo9xxgCOSaraH3eZz2mYzji.c1Oh3JyHtW14QkO	partner	2026-04-18 17:45:02.942+05:30	2026-04-18 17:45:02.942+05:30	t
bf6a6016-4474-418a-82a3-944ac3734643	Arjun	Kapoor	arjun.kapoor6@gmail.com	$2b$10$xiw3BrajoZo1/QwGaP4d/On2N6UyvX8kcxAyS7.NratR9/1.kRalS	partner	2026-04-18 17:45:10.132+05:30	2026-04-18 17:45:10.132+05:30	t
cb25254d-568a-4ada-b396-848ff1ff3aaa	Neha	Gupta	neha.gupta7@gmail.com	$2b$10$sOiX41u.z/VsUB5gHiYup.ef02MVnBZG3CMuLooTEZeuBOsK.sovC	partner	2026-04-18 17:45:18.351+05:30	2026-04-18 17:45:18.351+05:30	t
035f067b-7c92-41cd-90ab-c1399c362ae4	Rohit	Singh	rohit.singh8@gmail.com	$2b$10$wJ4cvhAWkLQpLKWoHpRQKe/FzlUHm8cO.FTVZILpSfCLE34PYl0jC	partner	2026-04-18 17:45:25.894+05:30	2026-04-18 17:45:25.894+05:30	t
90b6ddaa-a82b-4b01-812b-8bad6afb4084	Anjali	Das	anjali.das9@gmail.com	$2b$10$g6WGKlFo.hzz8q11nCiP7OcMQNaJFrdqNCvw0CPYNEYi2Ci34G8xy	partner	2026-04-18 17:45:33.371+05:30	2026-04-18 17:45:33.371+05:30	t
830c82d2-3da4-42d6-b4f3-bddda2c7c669	Vikram	Iyer	vikram.iyer10@gmail.com	$2b$10$NlUDWL6W5yoHkZ.hSUQuzuB9o8AsuEDc1r0qMnCsSh/o2F32V/1zu	partner	2026-04-18 17:45:40.257+05:30	2026-04-18 17:45:40.257+05:30	t
c6fc13bc-8edc-492e-8c94-b59b2d1503e9	Suresh	Patil	suresh.patil11@gmail.com	$2b$10$wc1jMVthd8RSnPJjkCSeg.JNONIrZNklgK/CPhRB2SbqHr0/TaKFq	partner	2026-04-18 17:47:10.438+05:30	2026-04-18 17:47:10.438+05:30	t
cb40110a-ce3c-4555-ae0d-184f008a368f	Deepak	Yadav	deepak.yadav12@gmail.com	$2b$10$8u73mljDm3wrHIVfqO/9EuvqCqaSqGuVdu2vEnnwQmZyJuVsWT1AS	partner	2026-04-18 17:47:16.006+05:30	2026-04-18 17:47:16.006+05:30	t
e928cea0-339c-4e9c-93e9-6ed4376e6cf1	Manoj	Kumar	manoj.kumar13@gmail.com	$2b$10$Nz/aTPE1ecjML9lJ3wzaH..ZPtdIEfXMZFBSBlxesOUslMSMGEqMW	partner	2026-04-18 17:47:29.646+05:30	2026-04-18 17:47:29.646+05:30	t
1bc54624-d3bd-46bf-ab31-7afc2d1e7c53	Pooja	Singh	pooja.singh14@gmail.com	$2b$10$ItOB38ZauLBXn3.GXv8FJuULmzAJl5B31F/r2TaXWonqd2z/clnuy	partner	2026-04-18 17:47:35.484+05:30	2026-04-18 17:47:35.484+05:30	t
5c12d037-c195-4fd0-a19f-327aee885bda	Rakesh	Jain	rakesh.jain15@gmail.com	$2b$10$bBY3S5VIo687D8EmDB0lG.r7GActCp4xWKBETGVYZ0jmsmFFuCyT2	partner	2026-04-18 17:47:42.325+05:30	2026-04-18 17:47:42.325+05:30	t
a5ed6bb3-3aad-4393-b77e-5f7c74a32876	Kavita	Joshi	kavita.joshi16@gmail.com	$2b$10$fIJhN9.5vC6f5zluzmdgsecyULOU..d34uT1NG2yai2nGMxzFvwvu	partner	2026-04-18 17:47:49.863+05:30	2026-04-18 17:47:49.863+05:30	t
0d0f613c-8d94-4419-ac64-e78905396597	Nitin	Agarwal	nitin.agarwal17@gmail.com	$2b$10$dtwbXODFX0Y0lWrxv4A0LuZwRkGJFnhFUBbNDsFSzGSK90Pn4pabe	partner	2026-04-18 17:47:56.763+05:30	2026-04-18 17:47:56.763+05:30	t
6f64af4a-5371-4dd1-ad38-a394470edc9f	Anita	Kulkarni	anita.kulkarni18@gmail.com	$2b$10$aSKv/igXwtKKGeaDqqA7zOVpG.mh7uQMvH3aemPAttcNi2HY5BX4C	partner	2026-04-18 17:48:03.821+05:30	2026-04-18 17:48:03.821+05:30	t
fde52396-dcb6-45f6-abaa-40c5ebdd0b06	Sunil	Naik	sunil.naik19@gmail.com	$2b$10$GL4Kxp5UugHT/12JM2tZpeXTVRldclGh/UY6mgo1aSERDf1IzPtxC	partner	2026-04-18 17:48:10.933+05:30	2026-04-18 17:48:10.933+05:30	t
\.


--
-- TOC entry 4860 (class 2606 OID 24651)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4866 (class 2606 OID 24678)
-- Name: activity_category_mappings activity_category_mappings_activity_id_category_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_activity_id_category_id_key UNIQUE (activity_id, category_id);


--
-- TOC entry 4868 (class 2606 OID 24676)
-- Name: activity_category_mappings activity_category_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 24784)
-- Name: business_types business_types_name_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key UNIQUE (name);


--
-- TOC entry 4848 (class 2606 OID 24786)
-- Name: business_types business_types_name_key1; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key1 UNIQUE (name);


--
-- TOC entry 4850 (class 2606 OID 24604)
-- Name: business_types business_types_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4863 (class 2606 OID 24664)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4871 (class 2606 OID 24711)
-- Name: partner_activities partner_activities_partner_profile_id_activity_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_partner_profile_id_activity_id_key UNIQUE (partner_profile_id, activity_id);


--
-- TOC entry 4873 (class 2606 OID 24709)
-- Name: partner_activities partner_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4854 (class 2606 OID 24623)
-- Name: partner_profiles partner_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4857 (class 2606 OID 24625)
-- Name: partner_profiles partner_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4837 (class 2606 OID 24766)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4839 (class 2606 OID 24768)
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- TOC entry 4841 (class 2606 OID 24770)
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- TOC entry 4843 (class 2606 OID 17390)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4858 (class 1259 OID 24819)
-- Name: activities_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX activities_name ON public.activities USING btree (name);


--
-- TOC entry 4864 (class 1259 OID 24689)
-- Name: activity_category_mappings_activity_id_category_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX activity_category_mappings_activity_id_category_id ON public.activity_category_mappings USING btree (activity_id, category_id);


--
-- TOC entry 4844 (class 1259 OID 24787)
-- Name: business_types_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX business_types_name ON public.business_types USING btree (name);


--
-- TOC entry 4861 (class 1259 OID 24826)
-- Name: categories_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX categories_name ON public.categories USING btree (name);


--
-- TOC entry 4869 (class 1259 OID 24722)
-- Name: partner_activities_partner_profile_id_activity_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX partner_activities_partner_profile_id_activity_id ON public.partner_activities USING btree (partner_profile_id, activity_id);


--
-- TOC entry 4851 (class 1259 OID 24637)
-- Name: partner_profiles_business_type_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE INDEX partner_profiles_business_type_id ON public.partner_profiles USING btree (business_type_id);


--
-- TOC entry 4852 (class 1259 OID 24816)
-- Name: partner_profiles_is_active; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE INDEX partner_profiles_is_active ON public.partner_profiles USING btree (is_active);


--
-- TOC entry 4855 (class 1259 OID 24636)
-- Name: partner_profiles_user_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX partner_profiles_user_id ON public.partner_profiles USING btree (user_id);


--
-- TOC entry 4835 (class 1259 OID 24771)
-- Name: users_email; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX users_email ON public.users USING btree (email);


--
-- TOC entry 4876 (class 2606 OID 24832)
-- Name: activity_category_mappings activity_category_mappings_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4877 (class 2606 OID 24837)
-- Name: activity_category_mappings activity_category_mappings_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4878 (class 2606 OID 24851)
-- Name: partner_activities partner_activities_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4879 (class 2606 OID 24846)
-- Name: partner_activities partner_activities_partner_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_partner_profile_id_fkey FOREIGN KEY (partner_profile_id) REFERENCES public.partner_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4874 (class 2606 OID 24807)
-- Name: partner_profiles partner_profiles_business_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_business_type_id_fkey FOREIGN KEY (business_type_id) REFERENCES public.business_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 24802)
-- Name: partner_profiles partner_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-04-19 16:27:50

--
-- PostgreSQL database dump complete
--

\unrestrict AB0i6Huh7dIMGz9yvpxAgHTdsVmD0YhGyhZ4gF5fhijN7nJEv4ogPearCafdg7L

