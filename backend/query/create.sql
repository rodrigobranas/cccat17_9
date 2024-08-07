drop schema if exists cccat17 cascade;

create schema cccat17;

create table cccat17.ride_projection (
	ride_id uuid,
	fare numeric,
	status text,
	passenger_name text,
	driver_name text,
	payment_status text,
	payment_amount numeric
);
