--
-- PostgreSQL database dump
--

\restrict Y6r5LVKUYgnTrwZ7eu9nyiNeiCffMTZndrPfXtSFKq4M7uSix2bwobCpd1yvBP5

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-16 21:56:07

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
-- TOC entry 5032 (class 0 OID 0)
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
    is_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
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
-- TOC entry 5023 (class 0 OID 24639)
-- Dependencies: 223
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.activities (id, name, description, category, is_active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5025 (class 0 OID 24666)
-- Dependencies: 225
-- Data for Name: activity_category_mappings; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.activity_category_mappings (id, activity_id, category_id, is_active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 24593)
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
-- TOC entry 5024 (class 0 OID 24653)
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
-- TOC entry 5026 (class 0 OID 24697)
-- Dependencies: 226
-- Data for Name: partner_activities; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.partner_activities (id, partner_profile_id, activity_id, price, status, is_active, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5022 (class 0 OID 24608)
-- Dependencies: 222
-- Data for Name: partner_profiles; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.partner_profiles (id, user_id, business_type_id, "businessName", description, phone, alternate_phone, contact_email, website, "gstNumber", pan_number, address_line_1, address_line_2, city, state, country, zip_code, is_verified, is_active, created_at, updated_at) FROM stdin;
def0a5c3-c1ee-4c3b-9d19-52e3ca25d430	799b01e6-6e23-4559-bd7e-d2790c5a56f1	d8f4eb13-9b5b-4f7f-bca2-37b8255dca02	Jhon Travels	We provide curated travel experiences, tours, and local activities across India.	9876543210	9876500000	contact@jhontravels.com	https://jhontravels.com	29ABCDE1234F1Z5	ABCDE1234F	MG Road	Near Metro Station	Bangalore	Karnataka	India	560001	f	t	2026-04-05 09:08:51.361+05:30	2026-04-05 09:08:51.361+05:30
a09434ac-47ab-4de5-acfa-12cf77721919	8d70d9dd-d9a7-4e63-90fc-50eae14b4f8b	e4c7e144-9f4e-42dc-97f7-de1f40f08bd0	Helen Resorts	A resort is a vacation destination that offers lodging, dining, recreation, and relaxation facilities in a scenic or leisure-focused setting.	9976825423	1234567899	\N	https://helenresorts.com	GST123456789	PAN123456789	Lane no 1	street 41	Bangalore	Karnataka	India	560001	f	t	2026-04-12 19:53:04.561+05:30	2026-04-12 19:53:04.561+05:30
\.


--
-- TOC entry 5020 (class 0 OID 17375)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.users (id, "firstName", "lastName", email, password_hash, role, created_at, updated_at, is_active) FROM stdin;
cd385013-9752-4a60-8c72-44f737dfc45e	Acquin	Monteiro	amonteiro030@gmail.com	$2b$10$py4/Iz/nn.MrWKxo0OezNutxTiu6yOgSr0NSbOPh2PPN8ZjbsZlY.	customer	2026-04-04 19:37:54.053+05:30	2026-04-04 19:37:54.053+05:30	t
799b01e6-6e23-4559-bd7e-d2790c5a56f1	Jhon	Doe	jhon@gmail.com	$2b$10$Tybd5F1rVGydmi8ICg6awu4ZlYUDK7UlUbIYVtETsHJX.mTNdOFcm	partner	2026-04-05 09:08:50.995+05:30	2026-04-05 09:08:50.995+05:30	t
2a4ff268-58ad-4073-8c31-fee2f9d71637	Super	Admin	admin@mail.com	$2b$10$cuSwxKee.0KphrpLbLOxVOBrdlrfXF4nRxvstLriB0JQPtelj1XFW	admin	2026-04-05 09:35:37.805572+05:30	2026-04-05 09:35:37.805572+05:30	t
8d70d9dd-d9a7-4e63-90fc-50eae14b4f8b	Helen	Monteiro	helen@mail.com	$2b$10$VSS2idTw/3ySB58Y9D8EReJzaOMNIhh/6ZvVl6wOfoxlcb8vbjOV.	partner	2026-04-12 19:53:04.447+05:30	2026-04-12 19:53:04.447+05:30	t
\.


--
-- TOC entry 4853 (class 2606 OID 24651)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4859 (class 2606 OID 24678)
-- Name: activity_category_mappings activity_category_mappings_activity_id_category_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_activity_id_category_id_key UNIQUE (activity_id, category_id);


--
-- TOC entry 4861 (class 2606 OID 24676)
-- Name: activity_category_mappings activity_category_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_pkey PRIMARY KEY (id);


--
-- TOC entry 4841 (class 2606 OID 24606)
-- Name: business_types business_types_name_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key UNIQUE (name);


--
-- TOC entry 4843 (class 2606 OID 24604)
-- Name: business_types business_types_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4856 (class 2606 OID 24664)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4864 (class 2606 OID 24711)
-- Name: partner_activities partner_activities_partner_profile_id_activity_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_partner_profile_id_activity_id_key UNIQUE (partner_profile_id, activity_id);


--
-- TOC entry 4866 (class 2606 OID 24709)
-- Name: partner_activities partner_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 24623)
-- Name: partner_profiles partner_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4850 (class 2606 OID 24625)
-- Name: partner_profiles partner_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4834 (class 2606 OID 24582)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4836 (class 2606 OID 24584)
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- TOC entry 4838 (class 2606 OID 17390)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4851 (class 1259 OID 24652)
-- Name: activities_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX activities_name ON public.activities USING btree (name);


--
-- TOC entry 4857 (class 1259 OID 24689)
-- Name: activity_category_mappings_activity_id_category_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX activity_category_mappings_activity_id_category_id ON public.activity_category_mappings USING btree (activity_id, category_id);


--
-- TOC entry 4839 (class 1259 OID 24607)
-- Name: business_types_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX business_types_name ON public.business_types USING btree (name);


--
-- TOC entry 4854 (class 1259 OID 24665)
-- Name: categories_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX categories_name ON public.categories USING btree (name);


--
-- TOC entry 4862 (class 1259 OID 24722)
-- Name: partner_activities_partner_profile_id_activity_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX partner_activities_partner_profile_id_activity_id ON public.partner_activities USING btree (partner_profile_id, activity_id);


--
-- TOC entry 4844 (class 1259 OID 24637)
-- Name: partner_profiles_business_type_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE INDEX partner_profiles_business_type_id ON public.partner_profiles USING btree (business_type_id);


--
-- TOC entry 4845 (class 1259 OID 24638)
-- Name: partner_profiles_is_active; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE INDEX partner_profiles_is_active ON public.partner_profiles USING btree (is_active);


--
-- TOC entry 4848 (class 1259 OID 24636)
-- Name: partner_profiles_user_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX partner_profiles_user_id ON public.partner_profiles USING btree (user_id);


--
-- TOC entry 4832 (class 1259 OID 24585)
-- Name: users_email; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX users_email ON public.users USING btree (email);


--
-- TOC entry 4869 (class 2606 OID 24679)
-- Name: activity_category_mappings activity_category_mappings_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4870 (class 2606 OID 24684)
-- Name: activity_category_mappings activity_category_mappings_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4871 (class 2606 OID 24717)
-- Name: partner_activities partner_activities_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4872 (class 2606 OID 24712)
-- Name: partner_activities partner_activities_partner_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_partner_profile_id_fkey FOREIGN KEY (partner_profile_id) REFERENCES public.partner_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4867 (class 2606 OID 24631)
-- Name: partner_profiles partner_profiles_business_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_business_type_id_fkey FOREIGN KEY (business_type_id) REFERENCES public.business_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4868 (class 2606 OID 24626)
-- Name: partner_profiles partner_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-04-16 21:56:09

--
-- PostgreSQL database dump complete
--

\unrestrict Y6r5LVKUYgnTrwZ7eu9nyiNeiCffMTZndrPfXtSFKq4M7uSix2bwobCpd1yvBP5

