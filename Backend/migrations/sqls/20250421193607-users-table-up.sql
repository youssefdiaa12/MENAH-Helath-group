/* Replace with your SQL commands */
create table users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    mobile VARCHAR(12),
    profileImage VARCHAR(255),
    password VARCHAR(100),
    profileType varchar(15),
    isActive boolean DEFAULT false
);