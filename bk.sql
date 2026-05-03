--
-- PostgreSQL database dump
--

\restrict AkUhVwx7Kr2V8GvTatUAfAyD7xiVH5kJ1HmdPgPDgLGFugRGYIUnbxbbbo7qhgj

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.1

-- Started on 2026-05-03 17:54:43

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
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 919 (class 1247 OID 24691)
-- Name: enum_partner_activities_status; Type: TYPE; Schema: public; Owner: amonteiro
--

CREATE TYPE public.enum_partner_activities_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_partner_activities_status OWNER TO amonteiro;

--
-- TOC entry 925 (class 1247 OID 24794)
-- Name: enum_partner_profiles_status; Type: TYPE; Schema: public; Owner: amonteiro
--

CREATE TYPE public.enum_partner_profiles_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_partner_profiles_status OWNER TO amonteiro;

--
-- TOC entry 898 (class 1247 OID 17335)
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
-- TOC entry 227 (class 1259 OID 33086)
-- Name: customer_plans; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.customer_plans (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    credits numeric(10,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.customer_plans OWNER TO amonteiro;

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
-- TOC entry 228 (class 1259 OID 33098)
-- Name: partner_plans; Type: TABLE; Schema: public; Owner: amonteiro
--

CREATE TABLE public.partner_plans (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    credit_limit_percent numeric(5,2) NOT NULL,
    booking_limit integer NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.partner_plans OWNER TO amonteiro;

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
-- TOC entry 5060 (class 0 OID 24639)
-- Dependencies: 223
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.activities (id, name, description, is_active, created_at, updated_at) FROM stdin;
d69f2df3-12c3-402c-b683-6255a5c5e748	Mountain Trekking	Guided trekking experiences through mountain trails and scenic landscapes.	t	2026-04-29 10:00:41.087+05:30	2026-04-29 10:00:41.087+05:30
c892a284-bcb5-43cd-9752-0b940d1beeef	River Rafting	Adventure rafting trips on fast-flowing rivers with safety equipment.	t	2026-04-29 10:01:14.808+05:30	2026-04-29 10:01:14.808+05:30
be5d887c-48d9-45ad-b0a3-775e65fee934	Scuba Diving	Underwater diving experiences exploring reefs and marine life.	t	2026-04-29 10:01:24.797+05:30	2026-04-29 10:01:24.797+05:30
4eb77eef-bde8-4254-9cd9-eef3242eb8d4	Island Hopping	Boat tours covering multiple islands and coastal attractions.	t	2026-04-29 10:01:34.676+05:30	2026-04-29 10:01:34.676+05:30
2865ed3e-49ef-4ebb-88c6-712b1b25e445	Heritage Walk	Walking tours exploring historical landmarks and architecture.	t	2026-04-29 10:01:49.011+05:30	2026-04-29 10:01:49.011+05:30
f65ecb28-7bce-4aeb-baf0-7088bd943ded	Local Food Tour	Taste authentic regional cuisine and street food experiences.	t	2026-04-29 10:02:06.115+05:30	2026-04-29 10:02:06.115+05:30
aaf83985-4a79-480e-8ee2-1b5045ca99fb	Jungle Safari	Wildlife safari tours in forests and national parks.	t	2026-04-29 10:02:15.161+05:30	2026-04-29 10:02:15.161+05:30
a4d3d913-0214-4daf-b363-6d8469b7a23d	Bird Watching	Nature trips focused on observing birds in natural habitats.	t	2026-04-29 10:02:23.371+05:30	2026-04-29 10:02:23.371+05:30
ae8df87c-7e83-4e14-af1c-425581e9630f	5-Star Resort Stay	Luxury resort accommodation with premium amenities and services.	t	2026-04-29 10:02:31.727+05:30	2026-04-29 10:02:31.727+05:30
c1ebdb54-f60b-428d-87f2-f08c58910ca9	Private Yacht Tour	Exclusive yacht cruise with personalized luxury experience.	t	2026-04-29 10:02:41.559+05:30	2026-04-29 10:02:41.559+05:30
\.


--
-- TOC entry 5062 (class 0 OID 24666)
-- Dependencies: 225
-- Data for Name: activity_category_mappings; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.activity_category_mappings (id, activity_id, category_id, is_active, created_at, updated_at) FROM stdin;
91b8b212-97b6-4bd1-a7f3-d6e5672debce	d69f2df3-12c3-402c-b683-6255a5c5e748	c83954ec-000e-4e39-9858-6cee75f97fe9	t	2026-04-29 10:00:41.099+05:30	2026-04-29 10:00:41.099+05:30
13689fe7-b5dd-49ce-af3e-063052d779f1	c892a284-bcb5-43cd-9752-0b940d1beeef	c83954ec-000e-4e39-9858-6cee75f97fe9	t	2026-04-29 10:01:14.82+05:30	2026-04-29 10:01:14.82+05:30
f19171da-87c6-46f1-acc0-19ffc19e3544	be5d887c-48d9-45ad-b0a3-775e65fee934	5056e7e6-cb8f-4bae-9e48-cf7d3b00179f	t	2026-04-29 10:01:24.807+05:30	2026-04-29 10:01:24.807+05:30
ee194e55-dae8-48a2-8668-00618325226f	4eb77eef-bde8-4254-9cd9-eef3242eb8d4	5056e7e6-cb8f-4bae-9e48-cf7d3b00179f	t	2026-04-29 10:01:34.7+05:30	2026-04-29 10:01:34.7+05:30
4c55cfd7-fab0-46d8-90b2-ed5de567ed6e	2865ed3e-49ef-4ebb-88c6-712b1b25e445	218bba5c-53db-4d4c-8c36-d6823526780c	t	2026-04-29 10:01:49.022+05:30	2026-04-29 10:01:49.022+05:30
74cdbb31-dfcb-42f3-bff5-a64a05ea1018	f65ecb28-7bce-4aeb-baf0-7088bd943ded	218bba5c-53db-4d4c-8c36-d6823526780c	t	2026-04-29 10:02:06.127+05:30	2026-04-29 10:02:06.127+05:30
b761fd52-6faf-42f0-95ba-8ead074bd1fd	aaf83985-4a79-480e-8ee2-1b5045ca99fb	efd37d53-6a34-4224-be5f-44e6aa25a108	t	2026-04-29 10:02:15.169+05:30	2026-04-29 10:02:15.169+05:30
559fb612-ae0b-421a-a00e-dfdae00dcb29	a4d3d913-0214-4daf-b363-6d8469b7a23d	efd37d53-6a34-4224-be5f-44e6aa25a108	t	2026-04-29 10:02:23.379+05:30	2026-04-29 10:02:23.379+05:30
896db444-ea6f-4e86-aa27-4d18e696cd29	ae8df87c-7e83-4e14-af1c-425581e9630f	e6b991fa-1b79-4d51-ad9e-894d327ce7bc	t	2026-04-29 10:02:31.734+05:30	2026-04-29 10:02:31.734+05:30
b7a3ab99-5d55-44df-8c8a-6eb0e37aaf21	c1ebdb54-f60b-428d-87f2-f08c58910ca9	e6b991fa-1b79-4d51-ad9e-894d327ce7bc	t	2026-04-29 10:02:41.566+05:30	2026-04-29 10:02:41.566+05:30
\.


--
-- TOC entry 5058 (class 0 OID 24593)
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
-- TOC entry 5061 (class 0 OID 24653)
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
c83954ec-000e-4e39-9858-6cee75f97fe9	Adventure Travel	Activities involving thrill, exploration, trekking, rafting, and extreme experiences.	t	2026-04-29 09:54:33.9+05:30	2026-04-29 09:54:33.9+05:30
\.


--
-- TOC entry 5064 (class 0 OID 33086)
-- Dependencies: 227
-- Data for Name: customer_plans; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.customer_plans (id, name, price, credits, is_active, created_at, updated_at) FROM stdin;
0786a1c8-cff1-40d9-8e3a-08fda7916231	Basic	1000.00	5000.00	t	2026-05-03 16:26:55.61+05:30	2026-05-03 16:26:55.61+05:30
\.


--
-- TOC entry 5063 (class 0 OID 24697)
-- Dependencies: 226
-- Data for Name: partner_activities; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.partner_activities (id, partner_profile_id, activity_id, price, status, is_active, created_at, updated_at) FROM stdin;
99f829c8-7788-49f7-95aa-9ba87ad56b3c	a09434ac-47ab-4de5-acfa-12cf77721919	2865ed3e-49ef-4ebb-88c6-712b1b25e445	500.00	approved	t	2026-04-30 16:31:48.778+05:30	2026-04-30 16:31:48.778+05:30
fc9afdd5-d17c-42cf-9fb6-919740a89a50	a09434ac-47ab-4de5-acfa-12cf77721919	be5d887c-48d9-45ad-b0a3-775e65fee934	1500.00	approved	t	2026-04-30 10:04:05.544+05:30	2026-04-30 10:04:05.544+05:30
7362e68c-0b28-4809-b763-f06a9ff19d35	f34ee931-6dd6-48e8-af01-6e59316113cd	c892a284-bcb5-43cd-9752-0b940d1beeef	800.00	approved	t	2026-05-01 18:24:16.599+05:30	2026-05-01 18:24:16.599+05:30
\.


--
-- TOC entry 5065 (class 0 OID 33098)
-- Dependencies: 228
-- Data for Name: partner_plans; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.partner_plans (id, name, price, credit_limit_percent, booking_limit, is_active, created_at, updated_at) FROM stdin;
4aa5ae2d-9ba6-4ca1-a81f-9b4e3a0589b3	Starter	1000.00	10.00	100	t	2026-05-03 17:46:01.507+05:30	2026-05-03 17:46:01.507+05:30
\.


--
-- TOC entry 5059 (class 0 OID 24608)
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
-- TOC entry 5057 (class 0 OID 17375)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: amonteiro
--

COPY public.users (id, "firstName", "lastName", email, password_hash, role, created_at, updated_at, is_active) FROM stdin;
cd385013-9752-4a60-8c72-44f737dfc45e	Acquin	Monteiro	amonteiro030@gmail.com	$2b$10$py4/Iz/nn.MrWKxo0OezNutxTiu6yOgSr0NSbOPh2PPN8ZjbsZlY.	customer	2026-04-04 19:37:54.053+05:30	2026-04-04 19:37:54.053+05:30	t
799b01e6-6e23-4559-bd7e-d2790c5a56f1	Jhon	Doe	jhon@gmail.com	$2b$10$Tybd5F1rVGydmi8ICg6awu4ZlYUDK7UlUbIYVtETsHJX.mTNdOFcm	partner	2026-04-05 09:08:50.995+05:30	2026-04-05 09:08:50.995+05:30	t
c096c28b-7ecd-4438-a713-f2d9678b30b8	Mahesh	Nayak	mahesh.nayak09@gmail.com	$2b$10$JnZJ/SRnGGzqhydV.F0tjOLcSPkAuWcn19JOV9WDwalb4dqJYWP0e	customer	2026-04-28 16:39:41.483+05:30	2026-04-28 16:39:41.483+05:30	t
166fbb03-d231-42aa-9831-eb59db897ba1	Ajay	Sharma	ajay.sharma10@gmail.com	$2b$10$pnROet9tu7uogU6jdTKe.uEaB2dDCZX9zTQQ4pcBHhJngQJ0N3YC2	customer	2026-04-28 16:39:49.492+05:30	2026-04-28 16:39:49.492+05:30	t
a397b335-5c82-4bc9-aa32-ce26847d09c2	Nitin	Pai	nitin.pai11@gmail.com	$2b$10$bffMb6cov9ie0EA8voQaLOsWn4Z8OAJoE4bixsUqXsPQynD11H2ge	customer	2026-04-28 16:39:58.155+05:30	2026-04-28 16:39:58.155+05:30	t
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
97b803d6-9094-4e59-ac98-3a55ed85f683	Rohan	Shetty	rohan.shetty01@gmail.com	$2b$10$bVp8c07fo.duxpHFdbKOaO9s95qrDxLAovqwNOG2fI2IjvPtC44NC	customer	2026-04-28 16:35:04.167+05:30	2026-04-28 16:35:04.167+05:30	t
8cefbd95-e0f0-4f42-8e6b-003a974b1f3b	Anil	Kumar	anil.kumar02@gmail.com	$2b$10$y9CepKWQJP4EwXMha3Hyfuxs7CnvctLkmOrxZpuR0rev56PKWTvfK	customer	2026-04-28 16:38:11.446+05:30	2026-04-28 16:38:11.446+05:30	t
ab3dba17-2a91-4631-95e2-ccc3fdc4cb62	Vikram	Patil	vikram.patil03@gmail.com	$2b$10$e5DyAnBCHPkpVyya4BKcxOyiP16LeghgKy5lnOLS6Ke3o.aT9nzDe	customer	2026-04-28 16:38:29.717+05:30	2026-04-28 16:38:29.717+05:30	t
8e059e44-17bb-4438-af55-0275a3071842	Deepak	Joshi	deepak.joshi04@gmail.com	$2b$10$Hr/hJe6SoBVL.6LGFhpYtOiXf8Nkw5EoaaBm/HZrevVOLF2OR4Vvm	customer	2026-04-28 16:38:53.049+05:30	2026-04-28 16:38:53.049+05:30	t
59f2f367-4cdb-4a1d-b0b9-cf1983dce14d	Kiran	Rao	kiran.rao05@gmail.com	$2b$10$tQ5/gVXPTCFle5Znv/EloeEpyE6GnjvAk1s8ykAD5pP1/isIlhUFS	customer	2026-04-28 16:39:06.291+05:30	2026-04-28 16:39:06.291+05:30	t
6b8862e8-9d20-4c37-8966-3c359fc7b092	Manoj	Bhat	manoj.bhat06@gmail.com	$2b$10$5yZWHAbh5Wm65oso2hzg.uKjYB.SRYOEF21B7Y.gUDbpvXYe2HTzi	customer	2026-04-28 16:39:17.102+05:30	2026-04-28 16:39:17.102+05:30	t
fb0f87f5-3910-409c-a9c6-ba21fb85e2a9	Suresh	Poojary	suresh.poojary07@gmail.com	$2b$10$uzR2YcNUtt9tCb1Wi0fuze4lMeCWW4SYBppul2Pzv85dluE6ZMdOC	customer	2026-04-28 16:39:24.686+05:30	2026-04-28 16:39:24.686+05:30	t
e82b1f05-9fba-4342-9e28-1c61ee027667	Prakash	Hegde	prakash.hegde08@gmail.com	$2b$10$U/6Nd7Vm7KnlQFiwP9.V8.ARFXRwT/ktV.Eeok4eGWlL9kpCIs2/.	customer	2026-04-28 16:39:33.448+05:30	2026-04-28 16:39:33.448+05:30	t
00d1a287-3a74-4b02-82d3-9b1999248deb	Harish	Kulkarni	harish.kulkarni12@gmail.com	$2b$10$kVaGkFQWFirJXjDsYuop9eCcccJ.JzKMn/9MV/ndPJHE27quBYoIW	customer	2026-04-28 16:40:07.853+05:30	2026-04-28 16:40:07.853+05:30	t
5445d8ec-9bb6-41ad-a3e3-707f7665e72c	Santosh	Acharya	santosh.acharya13@gmail.com	$2b$10$7otf/I3Z8OfwDpwbtKVZJOcB3.xIM2U5P6Gnnmz6cTEUP0aiLX7LC	customer	2026-04-28 16:40:16.521+05:30	2026-04-28 16:40:16.521+05:30	t
c5afebdc-0769-4b2c-937e-52bd0c96108f	Ganesh	Kamath	ganesh.kamath14@gmail.com	$2b$10$I6GD9r4eFF.AXAIR6sCKp.ULxEbW7mEQhFqSRc4kDsUbcsv4EMUgi	customer	2026-04-28 16:40:24.644+05:30	2026-04-28 16:40:24.644+05:30	t
3f307642-0390-4a18-8015-f78e13937474	Rakesh	Mallya	rakesh.mallya15@gmail.com	$2b$10$VtXIF.N7D965.60tZ.DkvenP8UQMuoFLxT1rEQEeSMRStB1nH7FcC	customer	2026-04-28 16:40:34.934+05:30	2026-04-28 16:40:34.934+05:30	t
edb9997e-463a-4b8a-9817-5b8f0bf7be4f	Umesh	Prabhu	umesh.prabhu16@gmail.com	$2b$10$e8JbHv5tFx8Og9JUKKrT4eHUZ3vVB.cbjzG6gakkAhzlni8qxCsV6	customer	2026-04-28 16:40:42.779+05:30	2026-04-28 16:40:42.779+05:30	t
5decdeef-9d29-4f3e-a22a-76a6aebea295	Dinesh	Salian	dinesh.salian17@gmail.com	$2b$10$ENPa7SOqcTIfweGQZz0YZeUhafVQOi.3r0vgZw0m8bqBVBUz58fD6	customer	2026-04-28 16:40:50.804+05:30	2026-04-28 16:40:50.804+05:30	t
24019b5d-e85d-4c7d-b681-c1dbb5f17117	Shyam	Reddy	shyam.reddy18@gmail.com	$2b$10$YCU.15Uw3Zek.y3HZr1xRuvC/ODoEo94VPKhV.3PMELpWedQ/yM9C	customer	2026-04-28 16:41:00.303+05:30	2026-04-28 16:41:00.303+05:30	t
3099e6dd-4fe6-46e0-9f88-1548ae7e3fb5	Tejas	Naik	tejas.naik20@gmail.com	$2b$10$Ha31kzXm35Fk738zEYE6WecDUp/NP5WXjPB5dEQlggsMJ2BWPaCIK	customer	2026-04-28 16:41:08.82+05:30	2026-04-28 16:41:08.82+05:30	t
d16e85a6-8c01-45a6-9a10-599b5db51f1f	Arjun	Shekar	arjun.shekar21@gmail.com	$2b$10$4wLhbQcPcvUh9i9KuA2qku3Ppc38sro7qJQN7Zob1JThL40PaQ4UK	customer	2026-04-28 16:41:20.359+05:30	2026-04-28 16:41:20.359+05:30	t
\.


--
-- TOC entry 4886 (class 2606 OID 24651)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 24678)
-- Name: activity_category_mappings activity_category_mappings_activity_id_category_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_activity_id_category_id_key UNIQUE (activity_id, category_id);


--
-- TOC entry 4894 (class 2606 OID 24676)
-- Name: activity_category_mappings activity_category_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_pkey PRIMARY KEY (id);


--
-- TOC entry 4864 (class 2606 OID 33009)
-- Name: business_types business_types_name_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key UNIQUE (name);


--
-- TOC entry 4866 (class 2606 OID 33011)
-- Name: business_types business_types_name_key1; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key1 UNIQUE (name);


--
-- TOC entry 4868 (class 2606 OID 33013)
-- Name: business_types business_types_name_key2; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key2 UNIQUE (name);


--
-- TOC entry 4870 (class 2606 OID 33015)
-- Name: business_types business_types_name_key3; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key3 UNIQUE (name);


--
-- TOC entry 4872 (class 2606 OID 33017)
-- Name: business_types business_types_name_key4; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key4 UNIQUE (name);


--
-- TOC entry 4874 (class 2606 OID 33007)
-- Name: business_types business_types_name_key5; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_name_key5 UNIQUE (name);


--
-- TOC entry 4876 (class 2606 OID 24604)
-- Name: business_types business_types_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.business_types
    ADD CONSTRAINT business_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4889 (class 2606 OID 24664)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4901 (class 2606 OID 33097)
-- Name: customer_plans customer_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.customer_plans
    ADD CONSTRAINT customer_plans_pkey PRIMARY KEY (id);


--
-- TOC entry 4897 (class 2606 OID 24711)
-- Name: partner_activities partner_activities_partner_profile_id_activity_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_partner_profile_id_activity_id_key UNIQUE (partner_profile_id, activity_id);


--
-- TOC entry 4899 (class 2606 OID 24709)
-- Name: partner_activities partner_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4903 (class 2606 OID 33110)
-- Name: partner_plans partner_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_plans
    ADD CONSTRAINT partner_plans_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 24623)
-- Name: partner_profiles partner_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 24625)
-- Name: partner_profiles partner_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4847 (class 2606 OID 32983)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4849 (class 2606 OID 32985)
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- TOC entry 4851 (class 2606 OID 32987)
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- TOC entry 4853 (class 2606 OID 32989)
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- TOC entry 4855 (class 2606 OID 32991)
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- TOC entry 4857 (class 2606 OID 32993)
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- TOC entry 4859 (class 2606 OID 32981)
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- TOC entry 4861 (class 2606 OID 17390)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4884 (class 1259 OID 33043)
-- Name: activities_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX activities_name ON public.activities USING btree (name);


--
-- TOC entry 4890 (class 1259 OID 24689)
-- Name: activity_category_mappings_activity_id_category_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX activity_category_mappings_activity_id_category_id ON public.activity_category_mappings USING btree (activity_id, category_id);


--
-- TOC entry 4862 (class 1259 OID 33018)
-- Name: business_types_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX business_types_name ON public.business_types USING btree (name);


--
-- TOC entry 4887 (class 1259 OID 33049)
-- Name: categories_name; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX categories_name ON public.categories USING btree (name);


--
-- TOC entry 4895 (class 1259 OID 24722)
-- Name: partner_activities_partner_profile_id_activity_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX partner_activities_partner_profile_id_activity_id ON public.partner_activities USING btree (partner_profile_id, activity_id);


--
-- TOC entry 4877 (class 1259 OID 24637)
-- Name: partner_profiles_business_type_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE INDEX partner_profiles_business_type_id ON public.partner_profiles USING btree (business_type_id);


--
-- TOC entry 4878 (class 1259 OID 33038)
-- Name: partner_profiles_is_active; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE INDEX partner_profiles_is_active ON public.partner_profiles USING btree (is_active);


--
-- TOC entry 4881 (class 1259 OID 24636)
-- Name: partner_profiles_user_id; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX partner_profiles_user_id ON public.partner_profiles USING btree (user_id);


--
-- TOC entry 4845 (class 1259 OID 32994)
-- Name: users_email; Type: INDEX; Schema: public; Owner: amonteiro
--

CREATE UNIQUE INDEX users_email ON public.users USING btree (email);


--
-- TOC entry 4906 (class 2606 OID 33055)
-- Name: activity_category_mappings activity_category_mappings_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4907 (class 2606 OID 33060)
-- Name: activity_category_mappings activity_category_mappings_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.activity_category_mappings
    ADD CONSTRAINT activity_category_mappings_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4908 (class 2606 OID 33074)
-- Name: partner_activities partner_activities_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4909 (class 2606 OID 33069)
-- Name: partner_activities partner_activities_partner_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_activities
    ADD CONSTRAINT partner_activities_partner_profile_id_fkey FOREIGN KEY (partner_profile_id) REFERENCES public.partner_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 33029)
-- Name: partner_profiles partner_profiles_business_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_business_type_id_fkey FOREIGN KEY (business_type_id) REFERENCES public.business_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4905 (class 2606 OID 33024)
-- Name: partner_profiles partner_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amonteiro
--

ALTER TABLE ONLY public.partner_profiles
    ADD CONSTRAINT partner_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-05-03 17:54:47

--
-- PostgreSQL database dump complete
--

\unrestrict AkUhVwx7Kr2V8GvTatUAfAyD7xiVH5kJ1HmdPgPDgLGFugRGYIUnbxbbbo7qhgj

