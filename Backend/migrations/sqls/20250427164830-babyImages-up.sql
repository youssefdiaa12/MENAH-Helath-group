/* Replace with your SQL commands */
create table babyImages(
    id serial primary key,
    url varchar(255),
    category varchar(50),
    baby_id varchar(12),
    CONSTRAINT fk_baby
        FOREIGN KEY (baby_id)
        REFERENCES baby(mrn) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);