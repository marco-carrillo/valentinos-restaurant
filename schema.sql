-- Creating the new schema even if one exists
drop schema if exists valentino_db;
create schema valentino_db;

-- Using the database just created
use valentino_db;

-- creating tables table
create table tables (
    id integer auto_increment,
    max_seating integer not null default 2,
    primary key (id)
);

-- creating tables roles
create table roles (
    id integer auto_increment,
    role_name varchar(100),
    is_admin boolean,
    primary key(id)
);

-- creating table users
create table users (
    id integer auto_increment,
    email varchar(255) not null,
    password varchar(255) not null,
    role_id integer,
    salary integer,
    primary key(id),
    foreign key (role_id)
    references roles (id)
);

-- creating table meal_type
create table meal_type(
    id integer auto_increment,
    name varchar(100) not null,
    requires_id boolean default true,
    primary key (id)
);

-- creating table meals
create table meals (
    id integer auto_increment,
    name varchar(100) not null,
    time_to_prepare integer not null,
    meal_cost decimal (10,2) not null,
    meal_price decimal (10,2) not null,
    meal_incentive decimal (10,2) not null,
    active boolean default true,
    meal_type_id integer,
    primary key (id),
    foreign key (meal_type_id)
    references meal_type (id)
);


-- create table order_status
create table order_status (
    id integer auto_increment,
    name varchar(10) not null,
    final_status boolean default true,
    primary key (id)
);

-- creating table order
create table orders (
    id integer auto_increment,
    customer_name varchar(100) not null,
    status_id integer not null,
    table_id integer not null,
    server_id integer not null,
    cook_id integer not null,
    total_bill decimal (10,2) default 0,
    primary key (id),
    foreign key (status_id)
    references order_status (id),
    foreign key (table_id)
    references tables (id),
    foreign key (server_id)
    references users (id),
    foreign key (cook_id)
    references users (id) 
);

-- creating table order_details
create table order_details (
    id integer auto_increment,
    order_id integer not null,
    meal_type_id integer not null,
    party_name varchar(100) not null,
    primary key (id),
    foreign key (order_id)
    references orders (id),
    foreign key (meal_type_id)
    references meals (id)
);
