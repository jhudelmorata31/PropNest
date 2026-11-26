-- PropNest MySQL schema aligned with the Laboratory Activity 04 design.
CREATE DATABASE IF NOT EXISTS propnest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE propnest;

CREATE TABLE IF NOT EXISTS users (
  UserID INT NOT NULL AUTO_INCREMENT,
  FullName VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  Role VARCHAR(20) NOT NULL,
  PRIMARY KEY (UserID),
  UNIQUE KEY UQ_users_Email (Email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  CategoryID INT NOT NULL AUTO_INCREMENT,
  CategoryName VARCHAR(50) NOT NULL,
  PRIMARY KEY (CategoryID),
  UNIQUE KEY UQ_categories_CategoryName (CategoryName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS properties (
  PropertyID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  CategoryID INT NOT NULL,
  Title VARCHAR(100) NOT NULL,
  Location VARCHAR(255) NOT NULL,
  Price DECIMAL(12,2) NOT NULL,
  `Status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (PropertyID),
  KEY IDX_properties_Location (Location),
  CONSTRAINT FK_properties_UserID FOREIGN KEY (UserID)
    REFERENCES users(UserID) ON DELETE RESTRICT,
  CONSTRAINT FK_properties_CategoryID FOREIGN KEY (CategoryID)
    REFERENCES categories(CategoryID) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS inquiries (
  InquiryID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  PropertyID INT NOT NULL,
  Message TEXT NOT NULL,
  InquiryDate DATETIME NOT NULL,
  PRIMARY KEY (InquiryID),
  CONSTRAINT FK_inquiries_UserID FOREIGN KEY (UserID)
    REFERENCES users(UserID) ON DELETE CASCADE,
  CONSTRAINT FK_inquiries_PropertyID FOREIGN KEY (PropertyID)
    REFERENCES properties(PropertyID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS property_images (
  ImageID INT NOT NULL AUTO_INCREMENT,
  PropertyID INT NOT NULL,
  ImageURL VARCHAR(255) NOT NULL,
  PRIMARY KEY (ImageID),
  CONSTRAINT FK_images_PropertyID FOREIGN KEY (PropertyID)
    REFERENCES properties(PropertyID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO categories (CategoryName)
VALUES ('House'), ('Condominium'), ('Land'), ('Commercial');
