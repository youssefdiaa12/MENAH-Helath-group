/* Replace with your SQL commands */

create table bottle(
    id serial primary key,
    order integer,
    date_of_expression date,
    date_of_delivery date,
    volume NUMERIC(10, 2) NOT NULL
);