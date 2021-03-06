PGDMP         #                x            bunkbyte    10.2    10.4 <    	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    333826    bunkbyte    DATABASE     �   CREATE DATABASE bunkbyte WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
    DROP DATABASE bunkbyte;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    5                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1                        3079    335335    citext 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
    DROP EXTENSION citext;
                  false    5                       0    0    EXTENSION citext    COMMENT     S   COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';
                       false    2                        3079    333836    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                  false    5                       0    0    EXTENSION postgis    COMMENT     g   COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';
                       false    3            �            1259    351936    agent    TABLE     �   CREATE TABLE public.agent (
    id integer NOT NULL,
    name character varying,
    designation character varying,
    mobile_no numeric(10,0),
    users_owner_id integer
);
    DROP TABLE public.agent;
       public         postgres    false    5            �            1259    351934    agent_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.agent_id_seq;
       public       postgres    false    223    5                       0    0    agent_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.agent_id_seq OWNED BY public.agent.id;
            public       postgres    false    222            �            1259    335537    land    TABLE     �  CREATE TABLE public.land (
    id integer NOT NULL,
    users_owner_id integer,
    total_area numeric,
    has_boundary boolean,
    municipality character varying,
    title_ownership character varying,
    title_nature character varying,
    is_khata_registered boolean,
    litigation_info character varying,
    is_documents_avail boolean,
    land_use_perm character varying,
    cons_approval json[],
    encumbrance boolean,
    tax_payment boolean,
    property_id integer
);
    DROP TABLE public.land;
       public         postgres    false    5            �            1259    335535    land_id_seq    SEQUENCE     �   CREATE SEQUENCE public.land_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.land_id_seq;
       public       postgres    false    5    216                       0    0    land_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.land_id_seq OWNED BY public.land.id;
            public       postgres    false    215            �            1259    351957    logistic_park    TABLE     �  CREATE TABLE public.logistic_park (
    id integer NOT NULL,
    land_area numeric(10,2),
    prop_built_area numeric(10,2),
    curr_built_area numeric(10,2),
    ratio_gb_area character varying,
    year_oper timestamp without time zone,
    land_appr character varying,
    area_bts numeric(10,2),
    area_rtm numeric(10,2),
    has_ca_security boolean,
    ca_security character varying,
    has_op_mtn_property boolean,
    op_mtn_property character varying,
    has_op_mtn_ca boolean,
    op_mtn_ca character varying,
    has_mtn_lg boolean,
    mtn_lg character varying,
    has_stp_wtp boolean,
    stp_wtp character varying,
    other_info character varying,
    users_owner_id integer,
    property_id integer
);
 !   DROP TABLE public.logistic_park;
       public         postgres    false    5            �            1259    351955    logistic_park_id_seq1    SEQUENCE     �   CREATE SEQUENCE public.logistic_park_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.logistic_park_id_seq1;
       public       postgres    false    5    225                       0    0    logistic_park_id_seq1    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.logistic_park_id_seq1 OWNED BY public.logistic_park.id;
            public       postgres    false    224            �            1259    343744    property    TABLE       CREATE TABLE public.property (
    id integer NOT NULL,
    name character varying,
    photo json[],
    video character varying,
    location public.geometry,
    type integer,
    approach_road character varying,
    users_owner_id integer,
    agent_id integer
);
    DROP TABLE public.property;
       public         postgres    false    5    3    5    3    5    3    5    3    5    3    5    3    5    3    5    3    5            �            1259    343742    property_id_seq    SEQUENCE     �   CREATE SEQUENCE public.property_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.property_id_seq;
       public       postgres    false    219    5                       0    0    property_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.property_id_seq OWNED BY public.property.id;
            public       postgres    false    218            �            1259    343771    property_type    TABLE     [   CREATE TABLE public.property_type (
    id integer NOT NULL,
    name character varying
);
 !   DROP TABLE public.property_type;
       public         postgres    false    5            �            1259    343769    property_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.property_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.property_type_id_seq;
       public       postgres    false    5    221                       0    0    property_type_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.property_type_id_seq OWNED BY public.property_type.id;
            public       postgres    false    220            �            1259    335550    title_ownership_unused    TABLE     \   CREATE TABLE public.title_ownership_unused (
    id integer,
    title character varying
);
 *   DROP TABLE public.title_ownership_unused;
       public         postgres    false    5                       0    0    TABLE title_ownership_unused    COMMENT     m   COMMENT ON TABLE public.title_ownership_unused IS 'Use later to link title_ownership column of users_owner';
            public       postgres    false    217            �            1259    333829    users_owner    TABLE     �  CREATE TABLE public.users_owner (
    id integer NOT NULL,
    name character varying,
    email character varying,
    register_date timestamp without time zone DEFAULT now(),
    password character varying,
    mobile_no numeric(10,0),
    location public.geometry,
    oper_cities json[],
    registered_office character varying,
    tenants json[],
    secret_token character varying,
    jwt_token character varying,
    is_verified boolean DEFAULT false
);
    DROP TABLE public.users_owner;
       public         postgres    false    5    3    5    3    5    3    5    3    5    3    5    3    5    3    5    3    5            �            1259    333827    user_owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_owner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.user_owner_id_seq;
       public       postgres    false    5    199                       0    0    user_owner_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.user_owner_id_seq OWNED BY public.users_owner.id;
            public       postgres    false    198            �            1259    351985 	   warehouse    TABLE     *  CREATE TABLE public.warehouse (
    id integer NOT NULL,
    land_area numeric(20,2),
    built_area numeric(20,2),
    municipality character varying,
    year_oper timestamp without time zone,
    land_appr character varying,
    is_standalone boolean,
    logistic_park_id integer,
    space_avl character varying,
    area numeric(20,2),
    avail_date timestamp without time zone,
    carpet_area numeric(20,2),
    length numeric(20,2),
    breadth numeric(20,2),
    centre_height numeric,
    eave_height numeric,
    no_docks numeric,
    dock_height numeric,
    has_dock_lever boolean,
    floor_info character varying,
    building_type character varying,
    has_skylight boolean,
    skylight_type character varying,
    skylight_area json,
    has_fire_protect boolean,
    has_fire_detect boolean,
    park_area numeric(20,2),
    no_trucks_park numeric,
    no_charge_port numeric,
    no_power_outlet numeric,
    has_toilet boolean,
    has_office_space boolean,
    users_owner_id integer,
    property_id integer,
    has_charge_port boolean
);
    DROP TABLE public.warehouse;
       public         postgres    false    5            �            1259    351983    warehouse_id_seq    SEQUENCE     �   CREATE SEQUENCE public.warehouse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.warehouse_id_seq;
       public       postgres    false    5    227                       0    0    warehouse_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.warehouse_id_seq OWNED BY public.warehouse.id;
            public       postgres    false    226            q           2604    351939    agent id    DEFAULT     d   ALTER TABLE ONLY public.agent ALTER COLUMN id SET DEFAULT nextval('public.agent_id_seq'::regclass);
 7   ALTER TABLE public.agent ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    222    223    223            n           2604    335540    land id    DEFAULT     b   ALTER TABLE ONLY public.land ALTER COLUMN id SET DEFAULT nextval('public.land_id_seq'::regclass);
 6   ALTER TABLE public.land ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    215    216    216            r           2604    351960    logistic_park id    DEFAULT     u   ALTER TABLE ONLY public.logistic_park ALTER COLUMN id SET DEFAULT nextval('public.logistic_park_id_seq1'::regclass);
 ?   ALTER TABLE public.logistic_park ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    224    225    225            o           2604    343747    property id    DEFAULT     j   ALTER TABLE ONLY public.property ALTER COLUMN id SET DEFAULT nextval('public.property_id_seq'::regclass);
 :   ALTER TABLE public.property ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    219    218    219            p           2604    343774    property_type id    DEFAULT     t   ALTER TABLE ONLY public.property_type ALTER COLUMN id SET DEFAULT nextval('public.property_type_id_seq'::regclass);
 ?   ALTER TABLE public.property_type ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    220    221    221            j           2604    333832    users_owner id    DEFAULT     o   ALTER TABLE ONLY public.users_owner ALTER COLUMN id SET DEFAULT nextval('public.user_owner_id_seq'::regclass);
 =   ALTER TABLE public.users_owner ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            s           2604    351988    warehouse id    DEFAULT     l   ALTER TABLE ONLY public.warehouse ALTER COLUMN id SET DEFAULT nextval('public.warehouse_id_seq'::regclass);
 ;   ALTER TABLE public.warehouse ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    226    227    227                      0    351936    agent 
   TABLE DATA               Q   COPY public.agent (id, name, designation, mobile_no, users_owner_id) FROM stdin;
    public       postgres    false    223   0H       �          0    335537    land 
   TABLE DATA               �   COPY public.land (id, users_owner_id, total_area, has_boundary, municipality, title_ownership, title_nature, is_khata_registered, litigation_info, is_documents_avail, land_use_perm, cons_approval, encumbrance, tax_payment, property_id) FROM stdin;
    public       postgres    false    216   �H                 0    351957    logistic_park 
   TABLE DATA               B  COPY public.logistic_park (id, land_area, prop_built_area, curr_built_area, ratio_gb_area, year_oper, land_appr, area_bts, area_rtm, has_ca_security, ca_security, has_op_mtn_property, op_mtn_property, has_op_mtn_ca, op_mtn_ca, has_mtn_lg, mtn_lg, has_stp_wtp, stp_wtp, other_info, users_owner_id, property_id) FROM stdin;
    public       postgres    false    225   wL       �          0    343744    property 
   TABLE DATA               s   COPY public.property (id, name, photo, video, location, type, approach_road, users_owner_id, agent_id) FROM stdin;
    public       postgres    false    219   N                  0    343771    property_type 
   TABLE DATA               1   COPY public.property_type (id, name) FROM stdin;
    public       postgres    false    221   vS       i          0    334136    spatial_ref_sys 
   TABLE DATA               X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public       postgres    false    201   �S       �          0    335550    title_ownership_unused 
   TABLE DATA               ;   COPY public.title_ownership_unused (id, title) FROM stdin;
    public       postgres    false    217   �S       �          0    333829    users_owner 
   TABLE DATA               �   COPY public.users_owner (id, name, email, register_date, password, mobile_no, location, oper_cities, registered_office, tenants, secret_token, jwt_token, is_verified) FROM stdin;
    public       postgres    false    199   T                 0    351985 	   warehouse 
   TABLE DATA               �  COPY public.warehouse (id, land_area, built_area, municipality, year_oper, land_appr, is_standalone, logistic_park_id, space_avl, area, avail_date, carpet_area, length, breadth, centre_height, eave_height, no_docks, dock_height, has_dock_lever, floor_info, building_type, has_skylight, skylight_type, skylight_area, has_fire_protect, has_fire_detect, park_area, no_trucks_park, no_charge_port, no_power_outlet, has_toilet, has_office_space, users_owner_id, property_id, has_charge_port) FROM stdin;
    public       postgres    false    227   -X                  0    0    agent_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.agent_id_seq', 27, true);
            public       postgres    false    222                       0    0    land_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.land_id_seq', 80, true);
            public       postgres    false    215                       0    0    logistic_park_id_seq1    SEQUENCE SET     D   SELECT pg_catalog.setval('public.logistic_park_id_seq1', 36, true);
            public       postgres    false    224                       0    0    property_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.property_id_seq', 189, true);
            public       postgres    false    218                       0    0    property_type_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.property_type_id_seq', 4, true);
            public       postgres    false    220                       0    0    user_owner_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.user_owner_id_seq', 51, true);
            public       postgres    false    198                       0    0    warehouse_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.warehouse_id_seq', 25, true);
            public       postgres    false    226            w           2606    335545    land land_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.land
    ADD CONSTRAINT land_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.land DROP CONSTRAINT land_pkey;
       public         postgres    false    216            u           2606    335434    users_owner users_owner_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users_owner
    ADD CONSTRAINT users_owner_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.users_owner DROP CONSTRAINT users_owner_pkey;
       public         postgres    false    199               �   x�E�M
�0���)z�.2i~�\�P�"�04EM������*�f���p�8`��b8�V�\���Xx�ax'���q*��5����,�>��#O��u%�!e,mB��)���=N�沿HRR�uS�������e;��J�!Թ�ߑ����[)�� E�6c      �   �  x���OO�0 �sާ�8�����Ø&Mh�]�D��B����о�\;�P������CP	�͏g���"x�L��,�"����������[����8���Ǽ�$||^�c=��M3ߌ�l�뻹�S��殗����zn}��?�P�M��������ro���7��5�|��9����n�W~=�}����u�_����t']�.S������Ⱥ����3\� �b��A���!�����@��!Y [pBGE+U����C��t��C�p)2��B��b`0K�$K����Jj"�&1 )�Âܥ���L���FR%���9�G�dL�9�i`k�)�T�Bǐ ]� �N���@.�8��2�РXZ�(�@�0�b*.�=]Â���a�"d*&�RH*U�sT��6<�V��!(M=�<,8(C5�L0���Ӷ������iЮ�Ρ@Uۚ:i`kh�1w��@�0�9�7rѰ�������5��g��%�<���M��i�u��q�ڮ	ת8���UfX��M�9\t�@띕N`�ʖ��^��Ԫ�^� m	#	�F&
���S�_C�aK�WP��ÀIMuƨ�a���zUQ�]ÁI-uz�	�EF�:���f`b����.��G��+�9y�{pUv�:N-h��'	'+G�G.���r�8@���b�K/w���޹�`�n��F�b.Ά+_����C*�q�ǲ��"<�����i[�?ʍ�E=w�:�:�)�!�g�����u`��?��P���w�D��*�|+������f89X���}��~�����Gb(b�|�Z��J�R�u�^I��R��	���&aq܃��V�[o3�<��B�3`ٲ��J��!���X�!|���oj������ �4��d         �  x����N�@E�s��? ��dK�T	�l**
���~<Iʳ�C��(�3��ɱ����qL�I8	-���?�����j�~z�>>w��֌�)n��v]?hv���]�-ܝkkp�W��m7�v��;��	��U�w
�',ӱ����A��pb��1)-��x]M:e����E[�V,��X�F���D�5m�<y���`�p '�f͈?�ϖg� �jE3�L ��� �2	$V&���)�8{��
Jv�xP�F���0�6B��Fh?Ҟd�����L7+X��`@*8ڐ��Ɉ8�6�o2.VF�f�2�`�@��j�X=Pu��)�!@�"�%�>h=>�7i�������"q�����7�9��7�櫖:����X��      �   T  x��ZKo7>[�"�R�3�ǰ7.�Z9�����h�<��i�[��^r]����J�²%-�ӷ3߼(ۋ�W_.�\__��|�-�/�_~���������/�����ǻ7�ݗ��������p�����n���|y�VS/�^	�{��J`�lW�^`����J`��+�}'0(�y��BC7���۹���׋_��
�߫���P�cU9P%;=Q�u�ub6���4�%�Ț����A�tpr�@)��>Y�i�B��i�D� S�&H�Dܫ����cZ�<�uB��U��x�c�LΙ|+4__<�<��~���S^����],	sh�'@eC�;M��@w�Ze�KO�g�b��CZ�`�2�0 숥���$�5�%�w�:ky4AW�0:*A�Mny"�<�#.��'�P����ʔu6>��D{�W�vXT�ؘte�H�72��4h����j=5�'� IΧ�����9��ȕi
ɁULa ����6�݁0��G��`�V�G2�
U��z_Σ�M�o�'�*�*O�Ψ�r��T�}>��|S�UY5E��΃���{��@f*x�`;��ߦň0�4�l3�h�#n��:E!KѾNqe��L�C���0$��ҟ�k���SZ���/L�-n������΀(̀-n������N�(L�-n� (����:�wu�� |iJ��nԐ9��ۈ ��f�tJ�G������������n۬��C�F��tatL�p[5��7��V�bO��3�4d5u"T,�H�ˈ��3,�^/�^�~���+]Kt��ˎ1F7dn���k���~uX'�}���n�Õv�*e��LV���4���4�����vπB�iq{�ՠ��� T����PZ��j �1.�V��hq���u:�^�I[v-�v�Z��;��jq��}����Z�su_-��\�W�{���]Y!��);[7-�-=���G�{��u��>��G�#*�ނ��Q!���%t�B�;�q~V�����=^V��ݒN>ڑ�����}��W��${�nf۬��f�ɧ�v������u<7�N�T}uJIň4��n��.n����N����/X`�.�j[:f���;��H0��AH?�U�'{��V8^	����O�7��{����ۃ��vfq��৙�xH�]���i׊v��3�Y>��{�~�=�I!E����Q�h,�N�F8�!��|Ra7k����Ee��ҙ�	P��А&DC���|5(3�pa,	�"��~�S��'$�r��>��b�/����?��n��Nv��ݳ��'�'�)/@�c�`����r6ι)2����FF�ۡ� �{��O�����%j��������l6� ۗ�          A   x�3���O�,.�L.VH,��2��I�K�2�.Һ�9�y�
�E���ũ\&�>H�=... ��      i      x������ � �      �      x������ � �      �     x���[o�<ǯ駨�]n����� 	�Hڨ��)@8�p�i��u�tz������y,����10��1��E��d��1�+D��'��c�a9��>�g>/N�2+L��>�^kR�d���<�sQON�?���9VܰZ���c���������f�kO��*�����O�DU�A�z��J��}Aa��|\*����O���� 5�K���~���A��N�;�BP�P�c/���}J����9�I>΁�D+�>tF=Ņ����[n�~/�����"�/h.xP{� /phzL08 �M��9v��W¦[���Uy�i��d�FO��R,fZ,:�ʺ��7�[8����6�ZF�6�$_�� Ǻ���I�V�8@��^�o9\�����:@��3��Gʆ<c����a�P;r�	��L;�/QR7�_cn�u��qR�{v��!9&�1��7b�W`!)W��K6�;�Sx�p�(���͜50�gq ��dA���H �H̥s)�E���4I�9��FPS�� ��ӏ��O~Ҝu7Qw��|���� ����V�{��%���/�Ea'�D���㨼ͽ�;a�=\bV�EpY�u�MX�E�,mq��אSeב���ʯ_�NWʝ���)��+u��kG=y㨳>,)}�n�Ѻ���Ug��E�|��fr�U�y��F ���)T��8�XsG����s���$�ݠJ�_��V_>G��s�47&��fp"�G������ţ+��b-y������}�՚�7r�%}�8�-;"B�p�W��(!3]\�2�Dr#Z"�G�2�"�Sc 檈�f����*�G}�׳���b��^���%{#v��j��q�{��V�'ڰ��zH�E�A^��j:~�u+ξ*L���/�2����x��P^��.���t����W���Hc�r�G���Ud��,|L�t��40���⬱�g[*C{�JJ�t��[e'y��=��lv�m%"~$���������u�ˇ���oy�t]E# �P���,��W�n�U�)IdS0:|�Q�(V��g����?k![�         �  x�͖�n�0E��+�D���2Q���4�l�hVU���չ<
) ��D`Kf�s�� ��|�kk�io��D�=�����f���Ǽ<m1���|G_�:D׭ב�q���)3�+Q�(w%:%����!����L9q.��������B5��D�-��zz���7Ok�jv��V�K�+,�+��bҼUi�1��JKu��_>-�%\�m�*+���!Dd���B�{�O��� &km?_�|y'�UYb�u,,�(Ѭ�2:
1�ݮS�E���R���#)�P$CEd��N��L$P����k��z� �OQS�:o�įP!�����S��BPq���G�(M�Pw����b89݀��#�#UY�N��prx.
_)��E���;���2�p;�2#*��'6�­3��D�C!�<�$K�������蜰k�%��C%�X�j��β�!�W�     