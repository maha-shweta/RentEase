-- Seed data for RentEase
-- Run this in pgAdmin after the schema migration

-- 1. Insert a landlord (password: test123)
INSERT INTO landlords (name, email, password_hash, phone) VALUES
('John Smith', 'john@rentease.com', 'MOCKED_HASH_test123', '555-123-4567'),
('Sarah Johnson', 'sarah@rentease.com', 'MOCKED_HASH_test123', '555-987-6543');

-- 2. Insert properties for landlord 1
INSERT INTO properties (landlord_id, address, type, size) VALUES
(1, '123 Oak Street, Downtown', 'apartment', 1200),
(1, '456 Maple Avenue, Suburb', 'house', 2400),
(1, '789 Pine Road, Business District', 'commercial', 3000),
(2, '321 Elm Boulevard, Westside', 'apartment', 900);

-- 3. Insert units for properties
INSERT INTO units (property_id, unit_number, rent_amount, size, status) VALUES
(1, 'A101', 1500.00, 600, 'Occupied'),
(1, 'A102', 1450.00, 580, 'Available'),
(1, 'B201', 1600.00, 650, 'Occupied'),
(2, 'Main', 2500.00, 2400, 'Occupied'),
(3, 'Suite A', 3500.00, 1500, 'Available'),
(3, 'Suite B', 3200.00, 1500, 'Occupied'),
(4, '1A', 1100.00, 450, 'Occupied'),
(4, '1B', 1100.00, 450, 'Available');

-- 4. Insert tenants (password: tenant123)
INSERT INTO tenants (name, email, password_hash, phone) VALUES
('Alice Brown', 'alice@email.com', '$2b$10$hashedpassword1', '555-111-2222'),
('Bob Wilson', 'bob@email.com', '$2b$10$hashedpassword2', '555-333-4444'),
('Carol Davis', 'carol@email.com', '$2b$10$hashedpassword3', '555-555-6666'),
('David Miller', 'david@email.com', '$2b$10$hashedpassword4', '555-777-8888'),
('Eva Thompson', 'eva@email.com', '$2b$10$hashedpassword5', '555-999-0000');

-- 5. Insert rental agreements
INSERT INTO rental_agreements (tenant_id, unit_id, start_date, end_date, rent_amount, deposit_amount, status) VALUES
(1, 1, '2024-01-01', '2025-01-01', 1500.00, 1500.00, 'Active'),
(2, 3, '2024-03-15', '2025-03-15', 1600.00, 1600.00, 'Active'),
(3, 4, '2024-06-01', '2025-06-01', 2500.00, 2500.00, 'Active'),
(4, 6, '2024-02-01', '2025-02-01', 3200.00, 3200.00, 'Active'),
(5, 7, '2024-04-01', '2025-04-01', 1100.00, 1100.00, 'Active');

-- 6. Insert payments
INSERT INTO payments (rental_agreement_id, amount, due_date, paid_at, payment_status, late_fee) VALUES
(1, 1500.00, '2024-10-01', '2024-10-01 10:00:00', 'Paid', 0),
(1, 1500.00, '2024-11-01', '2024-11-02 14:30:00', 'Paid', 0),
(1, 1500.00, '2024-12-01', NULL, 'Pending', 0),
(2, 1600.00, '2024-10-15', '2024-10-15 09:00:00', 'Paid', 0),
(2, 1600.00, '2024-11-15', '2024-11-18 16:00:00', 'Paid', 50.00),
(2, 1600.00, '2024-12-15', NULL, 'Pending', 0),
(3, 2500.00, '2024-11-01', '2024-11-01 08:00:00', 'Paid', 0),
(3, 2500.00, '2024-12-01', NULL, 'Overdue', 75.00),
(4, 3200.00, '2024-11-01', '2024-11-01 12:00:00', 'Paid', 0),
(4, 3200.00, '2024-12-01', NULL, 'Pending', 0),
(5, 1100.00, '2024-11-01', '2024-11-05 11:00:00', 'Paid', 0),
(5, 1100.00, '2024-12-01', NULL, 'Overdue', 25.00);

-- 7. Insert utilities
INSERT INTO utilities (unit_id, utility_type, amount, bill_month, due_date, paid, paid_at) VALUES
(1, 'electricity', 85.50, '2024-11-01', '2024-11-15', TRUE, '2024-11-10 09:00:00'),
(1, 'water', 35.00, '2024-11-01', '2024-11-15', TRUE, '2024-11-10 09:00:00'),
(1, 'internet', 59.99, '2024-11-01', '2024-11-15', FALSE, NULL),
(3, 'electricity', 92.00, '2024-11-01', '2024-11-15', TRUE, '2024-11-12 14:00:00'),
(3, 'gas', 45.00, '2024-11-01', '2024-11-15', FALSE, NULL),
(4, 'electricity', 150.00, '2024-11-01', '2024-11-15', TRUE, '2024-11-08 10:00:00'),
(4, 'water', 65.00, '2024-11-01', '2024-11-15', TRUE, '2024-11-08 10:00:00'),
(6, 'electricity', 180.00, '2024-11-01', '2024-11-15', FALSE, NULL),
(7, 'electricity', 70.00, '2024-11-01', '2024-11-15', TRUE, '2024-11-14 16:00:00');

-- 8. Insert announcements
INSERT INTO announcements (landlord_id, property_id, title, message) VALUES
(1, 1, 'Holiday Maintenance Schedule', 'Building maintenance will be performed on December 24th. Please ensure access to utility areas.'),
(1, 2, 'Rent Increase Notice', 'Effective January 1st, 2025, rent will increase by 3% as per lease agreement terms.'),
(1, NULL, 'Happy Holidays!', 'Wishing all our tenants a wonderful holiday season and a happy new year!'),
(2, 4, 'New Amenities Available', 'We are pleased to announce new laundry facilities are now available in the basement.');

SELECT 'Seed data inserted successfully!' as result;
