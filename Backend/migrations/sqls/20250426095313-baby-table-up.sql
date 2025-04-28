/* Replace with your SQL commands */
create table baby(
    mrn varchar(12) primary key,
    name_ar varchar(50),
    name_en varchar(50),
    visit_number varchar(10),
    personal_id varchar(12),
    birth_certificate_id varchar(12),
    date_of_birth date,
    recorded_at date DEFAULT CURRENT_DATE,
    days_of_life integer,
    gestationalAge_weeks integer,
    gestationalAge_days integer,
    gestationalAge integer,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    birth_weight varchar(50),
    mother_id integer,
    CONSTRAINT fk_mother
        FOREIGN KEY (mother_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);