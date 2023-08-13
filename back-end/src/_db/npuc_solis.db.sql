-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema npuc_solis
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `npuc_solis` ;

-- -----------------------------------------------------
-- Schema npuc_solis
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `npuc_solis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `npuc_solis` ;

-- -----------------------------------------------------
-- Table `npuc_solis`.`schoolyear`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`schoolyear` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`schoolyear` (
  `ID` VARCHAR(2) NOT NULL,
  `school_year` VARCHAR(12) NULL DEFAULT NULL,
  `current` TINYINT(1) NULL DEFAULT NULL,
  `is_enrollment` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`_union`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`_union` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`_union` (
  `ID` VARCHAR(1) NOT NULL,
  `_union` VARCHAR(128) NULL DEFAULT NULL,
  `address` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`mission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`mission` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`mission` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mission` VARCHAR(128) NULL DEFAULT NULL,
  `address` VARCHAR(128) NULL DEFAULT NULL,
  `union_id` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `union_id` (`union_id` ASC) VISIBLE,
  CONSTRAINT `mission_ibfk_1`
    FOREIGN KEY (`union_id`)
    REFERENCES `npuc_solis`.`_union` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 108
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_cat` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_cat` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_name` VARCHAR(128) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `year_establish` VARCHAR(4) NULL DEFAULT NULL,
  `gov_recognition` VARCHAR(128) NULL DEFAULT NULL,
  `sec_status` VARCHAR(32) NULL DEFAULT NULL,
  `bir_status` VARCHAR(32) NULL DEFAULT NULL,
  `mission_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_cat_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `mission_id` (`mission_id` ASC) VISIBLE,
  INDEX `school_cat_id` (`school_cat_id` ASC) VISIBLE,
  CONSTRAINT `school_ibfk_1`
    FOREIGN KEY (`mission_id`)
    REFERENCES `npuc_solis`.`mission` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_ibfk_2`
    FOREIGN KEY (`school_cat_id`)
    REFERENCES `npuc_solis`.`school_cat` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1158
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`_emis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`_emis` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`_emis` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sy_id` VARCHAR(2) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `graduate` INT NULL DEFAULT NULL,
  `baptism` INT NULL DEFAULT NULL,
  `sda` INT NULL DEFAULT NULL,
  `non_sda` INT NULL DEFAULT NULL,
  `total_student` INT NULL DEFAULT NULL,
  `sda_teacher` INT NULL DEFAULT NULL,
  `non_sda_teacher` INT NULL DEFAULT NULL,
  `sda_school` INT NULL DEFAULT NULL,
  `state_cert` INT NULL DEFAULT NULL,
  `teaching_cert` INT NULL DEFAULT NULL,
  `teacher` INT NULL DEFAULT NULL,
  `non_teaching` INT NULL DEFAULT NULL,
  `total_personnel` INT NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `sy_id` (`sy_id` ASC) VISIBLE,
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `_emis_ibfk_1`
    FOREIGN KEY (`sy_id`)
    REFERENCES `npuc_solis`.`schoolyear` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `_emis_ibfk_2`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`grade_div`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`grade_div` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`grade_div` (
  `ID` VARCHAR(1) NOT NULL,
  `grade_div` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`academic_dept`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`academic_dept` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`academic_dept` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `div_id` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  INDEX `div_id` (`div_id` ASC) VISIBLE,
  CONSTRAINT `academic_dept_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `academic_dept_ibfk_2`
    FOREIGN KEY (`div_id`)
    REFERENCES `npuc_solis`.`grade_div` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 416
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`department` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`department` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 111
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`work_assignment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`work_assignment` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`work_assignment` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `work_assignment` VARCHAR(128) NULL DEFAULT NULL,
  `dept_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `dept_id` (`dept_id` ASC) VISIBLE,
  CONSTRAINT `work_assignment_ibfk_1`
    FOREIGN KEY (`dept_id`)
    REFERENCES `npuc_solis`.`department` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 111
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`member_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`member_group` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`member_group` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`member` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`member` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(32) NULL DEFAULT NULL,
  `firstname` VARCHAR(32) NULL DEFAULT NULL,
  `middlename` VARCHAR(32) NULL DEFAULT NULL,
  `fullname` VARCHAR(64) NULL DEFAULT NULL,
  `gender` ENUM('Male', 'Female') NULL DEFAULT NULL,
  `bday` DATE NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `mobile` VARCHAR(64) NULL DEFAULT NULL,
  `group_id` INT UNSIGNED NULL DEFAULT NULL,
  `remarks` VARCHAR(1) NULL DEFAULT NULL,
  `school_id` VARCHAR(9) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `group_id` (`group_id` ASC) VISIBLE,
  CONSTRAINT `member_ibfk_1`
    FOREIGN KEY (`group_id`)
    REFERENCES `npuc_solis`.`member_group` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10173
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_staff` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_staff` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `work_id` INT UNSIGNED NULL DEFAULT NULL,
  `member_id` INT UNSIGNED NULL DEFAULT NULL,
  `sy_id` VARCHAR(2) NULL DEFAULT NULL,
  `is_staff` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  INDEX `work_id` (`work_id` ASC) VISIBLE,
  INDEX `member_id` (`member_id` ASC) VISIBLE,
  INDEX `sy_id` (`sy_id` ASC) VISIBLE,
  CONSTRAINT `school_staff_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_staff_ibfk_2`
    FOREIGN KEY (`work_id`)
    REFERENCES `npuc_solis`.`work_assignment` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_staff_ibfk_3`
    FOREIGN KEY (`member_id`)
    REFERENCES `npuc_solis`.`member` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_staff_ibfk_4`
    FOREIGN KEY (`sy_id`)
    REFERENCES `npuc_solis`.`schoolyear` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1213
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`admin_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`admin_user` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`admin_user` (
  `ID` VARCHAR(7) NOT NULL,
  `account_name` VARCHAR(32) NULL DEFAULT NULL,
  `staff_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `staff_id` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `admin_user_ibfk_1`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`school_staff` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`religion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`religion` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`religion` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `religion` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 156
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`student_cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`student_cat` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`student_cat` (
  `ID` VARCHAR(1) NOT NULL,
  `student_cat` VARCHAR(24) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`student_nationality`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`student_nationality` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`student_nationality` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nationality` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 109
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`student` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`student` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(32) NULL DEFAULT NULL,
  `firstname` VARCHAR(32) NULL DEFAULT NULL,
  `middlename` VARCHAR(32) NULL DEFAULT NULL,
  `fullname` VARCHAR(128) NULL DEFAULT NULL,
  `gender` ENUM('Male', 'Female') NULL DEFAULT NULL,
  `bday` DATE NULL DEFAULT NULL,
  `home_address` VARCHAR(128) NULL DEFAULT NULL,
  `lrn` VARCHAR(24) NULL DEFAULT NULL,
  `religion_id` INT UNSIGNED NULL DEFAULT NULL,
  `nationality_id` INT UNSIGNED NULL DEFAULT NULL,
  `graduated` TINYINT(1) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `student_cat_id` VARCHAR(1) NULL DEFAULT NULL,
  `guardian` VARCHAR(128) NULL DEFAULT NULL,
  `remarks` VARCHAR(16) NULL DEFAULT NULL,
  `is_enrollment` TINYINT(1) NULL DEFAULT NULL,
  `student_login_id` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  INDEX `religion_id` (`religion_id` ASC) VISIBLE,
  INDEX `student_cat_id` (`student_cat_id` ASC) VISIBLE,
  INDEX `nationality_id` (`nationality_id` ASC) VISIBLE,
  CONSTRAINT `student_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_2`
    FOREIGN KEY (`religion_id`)
    REFERENCES `npuc_solis`.`religion` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_3`
    FOREIGN KEY (`student_cat_id`)
    REFERENCES `npuc_solis`.`student_cat` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_4`
    FOREIGN KEY (`nationality_id`)
    REFERENCES `npuc_solis`.`student_nationality` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 18560
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`registration`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`registration` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`registration` (
  `ID` VARCHAR(16) NOT NULL,
  `student_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  `reg_date` DATE NULL DEFAULT NULL,
  `remarks` VARCHAR(16) NULL DEFAULT NULL,
  `stype` ENUM('Returning', 'New', 'Transferee') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  INDEX `school_year_id` (`school_year_id` ASC) VISIBLE,
  CONSTRAINT `registration_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `npuc_solis`.`student` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `registration_ibfk_2`
    FOREIGN KEY (`school_year_id`)
    REFERENCES `npuc_solis`.`schoolyear` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_term`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_term` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_term` (
  `ID` VARCHAR(1) NOT NULL,
  `school_term` VARCHAR(24) NULL DEFAULT NULL,
  `current` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`gradelevel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`gradelevel` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`gradelevel` (
  `ID` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`grade_level`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`grade_level` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`grade_level` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `grade_level` VARCHAR(32) NULL DEFAULT NULL,
  `academic_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_term_id` VARCHAR(1) NULL DEFAULT NULL,
  `enable` TINYINT(1) NULL DEFAULT NULL,
  `is_registration` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `academic_id` (`academic_id` ASC) VISIBLE,
  INDEX `school_term_id` (`school_term_id` ASC) VISIBLE,
  INDEX `grade_level` (`grade_level` ASC) VISIBLE,
  CONSTRAINT `grade_level_ibfk_1`
    FOREIGN KEY (`academic_id`)
    REFERENCES `npuc_solis`.`academic_dept` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_level_ibfk_2`
    FOREIGN KEY (`school_term_id`)
    REFERENCES `npuc_solis`.`school_term` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_level_ibfk_3`
    FOREIGN KEY (`grade_level`)
    REFERENCES `npuc_solis`.`gradelevel` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8894
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`section`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`section` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`section` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_name` VARCHAR(32) NULL DEFAULT NULL,
  `active` TINYINT(1) NULL DEFAULT NULL,
  `grade_level_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `grade_level_id` (`grade_level_id` ASC) VISIBLE,
  CONSTRAINT `section_ibfk_1`
    FOREIGN KEY (`grade_level_id`)
    REFERENCES `npuc_solis`.`grade_level` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8730
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`class_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`class_record` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`class_record` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reg_id` VARCHAR(16) NULL DEFAULT NULL,
  `section_id` INT UNSIGNED NULL DEFAULT NULL,
  `staff_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `reg_id` (`reg_id` ASC) VISIBLE,
  INDEX `section_id` (`section_id` ASC) VISIBLE,
  CONSTRAINT `class_record_ibfk_1`
    FOREIGN KEY (`reg_id`)
    REFERENCES `npuc_solis`.`registration` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `class_record_ibfk_2`
    FOREIGN KEY (`section_id`)
    REFERENCES `npuc_solis`.`section` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2130
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`component`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`component` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`component` (
  `ID` VARCHAR(1) NOT NULL,
  `component` VARCHAR(32) NULL DEFAULT NULL,
  `short_name` VARCHAR(2) NULL DEFAULT NULL,
  `item_order` VARCHAR(1) NULL DEFAULT NULL,
  `enable` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`subject_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`subject_group` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`subject_group` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_group` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`weight_percent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`weight_percent` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`weight_percent` (
  `ID` DOUBLE(5,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`subject_cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`subject_cat` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`subject_cat` (
  `ID` VARCHAR(1) NOT NULL,
  `description` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`subject_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`subject_list` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`subject_list` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_name` VARCHAR(128) NULL DEFAULT NULL,
  `subject_cat_id` VARCHAR(1) NULL DEFAULT NULL,
  `group_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `subject_cat_id` (`subject_cat_id` ASC) VISIBLE,
  INDEX `group_id` (`group_id` ASC) VISIBLE,
  CONSTRAINT `subject_list_ibfk_1`
    FOREIGN KEY (`subject_cat_id`)
    REFERENCES `npuc_solis`.`subject_cat` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `subject_list_ibfk_2`
    FOREIGN KEY (`group_id`)
    REFERENCES `npuc_solis`.`subject_group` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 124
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`subject_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`subject_type` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`subject_type` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_type` VARCHAR(24) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`subject` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`subject` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_id` INT UNSIGNED NULL DEFAULT NULL,
  `subject_list_id` INT UNSIGNED NULL DEFAULT NULL,
  `subject_type_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `section_id` (`section_id` ASC) VISIBLE,
  INDEX `subject_list_id` (`subject_list_id` ASC) VISIBLE,
  INDEX `subject_type_id` (`subject_type_id` ASC) VISIBLE,
  CONSTRAINT `subject_ibfk_1`
    FOREIGN KEY (`section_id`)
    REFERENCES `npuc_solis`.`section` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `subject_ibfk_2`
    FOREIGN KEY (`subject_list_id`)
    REFERENCES `npuc_solis`.`subject_list` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `subject_ibfk_3`
    FOREIGN KEY (`subject_type_id`)
    REFERENCES `npuc_solis`.`subject_type` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2167
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`class_offering`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`class_offering` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`class_offering` (
  `ID` VARCHAR(16) NOT NULL,
  `subject_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  `units` DOUBLE(5,1) NULL DEFAULT NULL,
  `orders` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  INDEX `school_year_id` (`school_year_id` ASC) VISIBLE,
  CONSTRAINT `class_offering_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `npuc_solis`.`subject` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `class_offering_ibfk_2`
    FOREIGN KEY (`school_year_id`)
    REFERENCES `npuc_solis`.`schoolyear` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`grade_component`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`grade_component` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`grade_component` (
  `ID` VARCHAR(24) NOT NULL,
  `component_id` VARCHAR(1) NULL DEFAULT NULL,
  `subject_group_id` INT UNSIGNED NULL DEFAULT NULL,
  `class_id` VARCHAR(16) NULL DEFAULT NULL,
  `weight_id` DOUBLE(6,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `component_id` (`component_id` ASC) VISIBLE,
  INDEX `subject_group_id` (`subject_group_id` ASC) VISIBLE,
  INDEX `weight_id` (`weight_id` ASC) VISIBLE,
  INDEX `class_id` (`class_id` ASC) VISIBLE,
  CONSTRAINT `grade_component_ibfk_1`
    FOREIGN KEY (`component_id`)
    REFERENCES `npuc_solis`.`component` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_component_ibfk_2`
    FOREIGN KEY (`subject_group_id`)
    REFERENCES `npuc_solis`.`subject_group` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_component_ibfk_3`
    FOREIGN KEY (`weight_id`)
    REFERENCES `npuc_solis`.`weight_percent` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_component_ibfk_4`
    FOREIGN KEY (`class_id`)
    REFERENCES `npuc_solis`.`class_offering` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`grading`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`grading` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`grading` (
  `ID` VARCHAR(1) NOT NULL DEFAULT '',
  `grading_period` VARCHAR(24) NULL DEFAULT NULL,
  `current` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`assessment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`assessment` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`assessment` (
  `ID` VARCHAR(40) NOT NULL DEFAULT '',
  `pscore` DOUBLE(6,1) NULL DEFAULT NULL,
  `descriptions` VARCHAR(128) NULL DEFAULT NULL,
  `given_date` DATE NULL DEFAULT NULL,
  `grade_comp_id` VARCHAR(24) NULL DEFAULT NULL,
  `grading_id` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `grade_comp_id` (`grade_comp_id` ASC) VISIBLE,
  INDEX `grading_id` (`grading_id` ASC) VISIBLE,
  CONSTRAINT `assessment_ibfk_1`
    FOREIGN KEY (`grade_comp_id`)
    REFERENCES `npuc_solis`.`grade_component` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `assessment_ibfk_2`
    FOREIGN KEY (`grading_id`)
    REFERENCES `npuc_solis`.`grading` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`ass_score`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`ass_score` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`ass_score` (
  `ID` VARCHAR(40) NOT NULL DEFAULT '',
  `class_record_id` INT UNSIGNED NULL DEFAULT NULL,
  `ass_id` VARCHAR(40) NULL DEFAULT NULL,
  `score` DOUBLE(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `class_record_id` (`class_record_id` ASC) VISIBLE,
  INDEX `ass_id` (`ass_id` ASC) VISIBLE,
  CONSTRAINT `ass_score_ibfk_1`
    FOREIGN KEY (`class_record_id`)
    REFERENCES `npuc_solis`.`class_record` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ass_score_ibfk_2`
    FOREIGN KEY (`ass_id`)
    REFERENCES `npuc_solis`.`assessment` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`cash_posting_journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`cash_posting_journal` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`cash_posting_journal` (
  `ID` VARCHAR(32) NOT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `from_receipt` VARCHAR(16) NULL DEFAULT NULL,
  `to_receipt` VARCHAR(16) NULL DEFAULT NULL,
  `cash_amount` DOUBLE(7,2) NULL DEFAULT NULL,
  `check_amount` DOUBLE(7,2) NULL DEFAULT NULL,
  `posted_by` VARCHAR(128) NULL DEFAULT NULL,
  `debit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `credit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `posted` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`cat` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`cat` (
  `ID` VARCHAR(2) NOT NULL,
  `category` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`chart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`chart` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`chart` (
  `ID` VARCHAR(5) NOT NULL,
  `account_name` VARCHAR(128) NULL DEFAULT NULL,
  `cat_id` VARCHAR(2) NULL DEFAULT NULL,
  `is_active` TINYINT(1) NULL DEFAULT NULL,
  `is_school_fee` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `cat_id` (`cat_id` ASC) VISIBLE,
  CONSTRAINT `chart_ibfk_1`
    FOREIGN KEY (`cat_id`)
    REFERENCES `npuc_solis`.`cat` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`checklist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`checklist` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`checklist` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `checklist` LONGTEXT NULL DEFAULT NULL,
  `section_id` INT UNSIGNED NULL DEFAULT NULL,
  `sub_module` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `section_id` (`section_id` ASC) VISIBLE,
  CONSTRAINT `checklist_ibfk_1`
    FOREIGN KEY (`section_id`)
    REFERENCES `npuc_solis`.`section` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 105
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`checklist_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`checklist_details` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`checklist_details` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NULL DEFAULT NULL,
  `checklist_id` INT UNSIGNED NULL DEFAULT NULL,
  `header_id` VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `checklist_id` (`checklist_id` ASC) VISIBLE,
  CONSTRAINT `checklist_details_ibfk_1`
    FOREIGN KEY (`checklist_id`)
    REFERENCES `npuc_solis`.`checklist` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 100072
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`checklist_grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`checklist_grade` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`checklist_grade` (
  `ID` VARCHAR(12) NOT NULL,
  `classrecord_id` INT UNSIGNED NULL DEFAULT NULL,
  `checklistdetails_id` INT NULL DEFAULT NULL,
  `grading_id` VARCHAR(1) NULL DEFAULT NULL,
  `ngrade` VARCHAR(5) NULL DEFAULT NULL,
  `lgrade` VARCHAR(3) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `classrecord_id` (`classrecord_id` ASC) VISIBLE,
  INDEX `checklistdetails_id` (`checklistdetails_id` ASC) VISIBLE,
  INDEX `grading_id` (`grading_id` ASC) VISIBLE,
  CONSTRAINT `checklist_grade_ibfk_1`
    FOREIGN KEY (`classrecord_id`)
    REFERENCES `npuc_solis`.`class_record` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `checklist_grade_ibfk_2`
    FOREIGN KEY (`checklistdetails_id`)
    REFERENCES `npuc_solis`.`checklist_details` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`checklist_header`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`checklist_header` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`checklist_header` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `headertext` LONGTEXT NULL DEFAULT NULL,
  `checklist_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `checklist_id` (`checklist_id` ASC) VISIBLE,
  CONSTRAINT `checklist_header_ibfk_1`
    FOREIGN KEY (`checklist_id`)
    REFERENCES `npuc_solis`.`checklist` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`journal` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`journal` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `journal_title` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 113
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`chk_journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`chk_journal` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`chk_journal` (
  `ID` VARCHAR(16) NOT NULL,
  `journal_id` INT UNSIGNED NULL DEFAULT NULL,
  `journal_title` VARCHAR(128) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `journal_id` (`journal_id` ASC) VISIBLE,
  CONSTRAINT `chk_journal_ibfk_1`
    FOREIGN KEY (`journal_id`)
    REFERENCES `npuc_solis`.`journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`chk_journals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`chk_journals` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`chk_journals` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chk_journal_id` VARCHAR(16) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `particular` LONGTEXT NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  `amount_in_words` LONGTEXT NULL DEFAULT NULL,
  `account_name` VARCHAR(32) NULL DEFAULT NULL,
  `gen_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `debit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `credit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `personel_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `journal_title` LONGTEXT NULL DEFAULT NULL,
  `is_posted` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `chk_journal_id` (`chk_journal_id` ASC) VISIBLE,
  CONSTRAINT `chk_journals_ibfk_1`
    FOREIGN KEY (`chk_journal_id`)
    REFERENCES `npuc_solis`.`chk_journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1000025
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`genaccount`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`genaccount` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`genaccount` (
  `ID` VARCHAR(16) NOT NULL,
  `chart_id` VARCHAR(5) NULL DEFAULT NULL,
  `account_name` VARCHAR(128) NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  `is_cash` ENUM('Yes', 'No') NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  `is_school_fee` ENUM('Yes', 'No') NULL DEFAULT NULL,
  `is_journal` ENUM('Yes', 'No') NULL DEFAULT NULL,
  `is_bank` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `chart_id` (`chart_id` ASC) VISIBLE,
  CONSTRAINT `genaccount_ibfk_1`
    FOREIGN KEY (`chart_id`)
    REFERENCES `npuc_solis`.`chart` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`chkaccount`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`chkaccount` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`chkaccount` (
  `ID` VARCHAR(16) NOT NULL,
  `genaccount_id` VARCHAR(16) NULL DEFAULT NULL,
  `payto_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `payto` VARCHAR(64) NULL DEFAULT NULL,
  `chknumber` VARCHAR(16) NULL DEFAULT NULL,
  `particular` LONGTEXT NULL DEFAULT NULL,
  `bank` VARCHAR(64) NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `genaccount_id` (`genaccount_id` ASC) VISIBLE,
  CONSTRAINT `chkaccount_ibfk_1`
    FOREIGN KEY (`genaccount_id`)
    REFERENCES `npuc_solis`.`genaccount` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`chkledger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`chkledger` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`chkledger` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chkaccount_id` VARCHAR(16) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `particular` LONGTEXT NULL DEFAULT NULL,
  `debit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `debit_accountname` VARCHAR(64) NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `chkaccount_id` (`chkaccount_id` ASC) VISIBLE,
  CONSTRAINT `chkledger_ibfk_1`
    FOREIGN KEY (`chkaccount_id`)
    REFERENCES `npuc_solis`.`chkaccount` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10000013
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`class_teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`class_teacher` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`class_teacher` (
  `ID` VARCHAR(24) NOT NULL DEFAULT '',
  `staff_id` INT UNSIGNED NULL DEFAULT NULL,
  `class_id` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `staff_id` (`staff_id` ASC) VISIBLE,
  INDEX `class_id` (`class_id` ASC) VISIBLE,
  CONSTRAINT `class_teacher_ibfk_1`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`school_staff` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `class_teacher_ibfk_2`
    FOREIGN KEY (`class_id`)
    REFERENCES `npuc_solis`.`class_offering` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`fee_label`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`fee_label` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`fee_label` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fee_label` VARCHAR(32) NULL DEFAULT NULL,
  `is_composite` TINYINT(1) NULL DEFAULT NULL,
  `shortname` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_fees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_fees` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_fees` (
  `ID` VARCHAR(12) NOT NULL,
  `fee_label_id` INT UNSIGNED NULL DEFAULT NULL,
  `grade_level_id` INT UNSIGNED NULL DEFAULT NULL,
  `amount` DOUBLE(7,2) NULL DEFAULT NULL,
  `gen_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `account_name` VARCHAR(128) NULL DEFAULT NULL,
  `ar_account_id` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fee_label_id` (`fee_label_id` ASC) VISIBLE,
  INDEX `grade_level_id` (`grade_level_id` ASC) VISIBLE,
  CONSTRAINT `school_fees_ibfk_1`
    FOREIGN KEY (`fee_label_id`)
    REFERENCES `npuc_solis`.`fee_label` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_fees_ibfk_2`
    FOREIGN KEY (`grade_level_id`)
    REFERENCES `npuc_solis`.`grade_level` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`composite_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`composite_items` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`composite_items` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_name` VARCHAR(32) NULL DEFAULT NULL,
  `amount` DOUBLE(7,2) NULL DEFAULT NULL,
  `school_fee_id` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_fee_id` (`school_fee_id` ASC) VISIBLE,
  CONSTRAINT `composite_items_ibfk_1`
    FOREIGN KEY (`school_fee_id`)
    REFERENCES `npuc_solis`.`school_fees` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`general_journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`general_journal` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`general_journal` (
  `ID` VARCHAR(16) NOT NULL,
  `journal_id` INT UNSIGNED NULL DEFAULT NULL,
  `journal_title` VARCHAR(128) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `journal_id` (`journal_id` ASC) VISIBLE,
  CONSTRAINT `general_journal_ibfk_1`
    FOREIGN KEY (`journal_id`)
    REFERENCES `npuc_solis`.`journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`general_journals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`general_journals` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`general_journals` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `journal_id` VARCHAR(16) NULL DEFAULT NULL,
  `journal_title` LONGTEXT NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `particular` LONGTEXT NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  `amount_in_words` LONGTEXT NULL DEFAULT NULL,
  `gen_account_id` VARCHAR(32) NULL DEFAULT NULL,
  `account_name` VARCHAR(32) NULL DEFAULT NULL,
  `debit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `credit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `or_number` VARCHAR(16) NULL DEFAULT NULL,
  `is_posted` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `journal_id` (`journal_id` ASC) VISIBLE,
  CONSTRAINT `general_journals_ibfk_1`
    FOREIGN KEY (`journal_id`)
    REFERENCES `npuc_solis`.`general_journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1000017
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`genledger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`genledger` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`genledger` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `gen_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `particular` VARCHAR(255) NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  `account_id` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `gen_account_id` (`gen_account_id` ASC) VISIBLE,
  CONSTRAINT `genledger_ibfk_1`
    FOREIGN KEY (`gen_account_id`)
    REFERENCES `npuc_solis`.`genaccount` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 445
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`grade` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`grade` (
  `ID` VARCHAR(32) NOT NULL,
  `class_record_id` INT UNSIGNED NULL DEFAULT NULL,
  `class_id` VARCHAR(16) NULL DEFAULT NULL,
  `grading_id` VARCHAR(1) NULL DEFAULT NULL,
  `mygrade` VARCHAR(9) NULL DEFAULT NULL,
  `date_submit` DATE NULL DEFAULT NULL,
  `remarks` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `class_record_id` (`class_record_id` ASC) VISIBLE,
  INDEX `class_id` (`class_id` ASC) VISIBLE,
  INDEX `grading_id` (`grading_id` ASC) VISIBLE,
  CONSTRAINT `grade_ibfk_1`
    FOREIGN KEY (`class_record_id`)
    REFERENCES `npuc_solis`.`class_record` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_ibfk_2`
    FOREIGN KEY (`class_id`)
    REFERENCES `npuc_solis`.`class_offering` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `grade_ibfk_3`
    FOREIGN KEY (`grading_id`)
    REFERENCES `npuc_solis`.`grading` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`grading_setting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`grading_setting` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`grading_setting` (
  `ID` VARCHAR(9) NOT NULL,
  `grading_id` VARCHAR(1) NULL DEFAULT NULL,
  `grading_period` VARCHAR(24) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `grading_setting_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`guardian`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`guardian` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`guardian` (
  `ID` VARCHAR(9) NOT NULL,
  `student_id` INT UNSIGNED NULL DEFAULT NULL,
  `gname` VARCHAR(128) NULL DEFAULT NULL,
  `email` VARCHAR(64) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `mobile` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  CONSTRAINT `guardian_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `npuc_solis`.`student` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`student_journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`student_journal` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`student_journal` (
  `ID` VARCHAR(16) NOT NULL DEFAULT '',
  `journal_id` INT UNSIGNED NULL DEFAULT NULL,
  `journal_title` VARCHAR(128) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `journal_id` (`journal_id` ASC) VISIBLE,
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  INDEX `school_year_id` (`school_year_id` ASC) VISIBLE,
  CONSTRAINT `student_journal_ibfk_1`
    FOREIGN KEY (`journal_id`)
    REFERENCES `npuc_solis`.`journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `student_journal_ibfk_2`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `student_journal_ibfk_3`
    FOREIGN KEY (`school_year_id`)
    REFERENCES `npuc_solis`.`schoolyear` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`journals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`journals` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`journals` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_id` VARCHAR(16) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `particular` LONGTEXT NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  `amount_in_words` LONGTEXT NULL DEFAULT NULL,
  `account_name` VARCHAR(32) NULL DEFAULT NULL,
  `gen_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `debit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `credit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `student_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `journal_title` LONGTEXT NULL DEFAULT NULL,
  `is_posted` ENUM('Yes', 'No') NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `reference_id` (`reference_id` ASC) VISIBLE,
  CONSTRAINT `journals_ibfk_1`
    FOREIGN KEY (`reference_id`)
    REFERENCES `npuc_solis`.`student_journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1000060
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`kgrade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`kgrade` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`kgrade` (
  `ID` VARCHAR(32) NOT NULL,
  `classrecord_id` INT UNSIGNED NULL DEFAULT NULL,
  `class_id` VARCHAR(16) NULL DEFAULT NULL,
  `grading_id` VARCHAR(1) NULL DEFAULT NULL,
  `mygrade` VARCHAR(9) NULL DEFAULT NULL,
  `lettergrade` VARCHAR(1) NULL DEFAULT NULL,
  `date_submit` DATE NULL DEFAULT NULL,
  `remarks` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `classrecord_id` (`classrecord_id` ASC) VISIBLE,
  INDEX `class_id` (`class_id` ASC) VISIBLE,
  INDEX `grading_id` (`grading_id` ASC) VISIBLE,
  CONSTRAINT `kgrade_ibfk_1`
    FOREIGN KEY (`classrecord_id`)
    REFERENCES `npuc_solis`.`class_record` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`last_or`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`last_or` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`last_or` (
  `ID` VARCHAR(12) NOT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `last_receipt` VARCHAR(12) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `last_or_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_attended`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_attended` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_attended` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_name` VARCHAR(128) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 159
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `npuc_solis`.`last_school`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`last_school` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`last_school` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `year_attended` VARCHAR(4) NULL DEFAULT NULL,
  `grade_level` VARCHAR(12) NULL DEFAULT NULL,
  `reg_id` VARCHAR(16) NULL DEFAULT NULL,
  `school_last_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `reg_id` (`reg_id` ASC) VISIBLE,
  INDEX `school_last_id` (`school_last_id` ASC) VISIBLE,
  CONSTRAINT `last_school_ibfk_1`
    FOREIGN KEY (`reg_id`)
    REFERENCES `npuc_solis`.`registration` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `last_school_ibfk_2`
    FOREIGN KEY (`school_last_id`)
    REFERENCES `npuc_solis`.`school_attended` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10095
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`login` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`login` (
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(32) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`username`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `login_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`mission_staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`mission_staff` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`mission_staff` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mission_id` INT UNSIGNED NULL DEFAULT NULL,
  `member_id` INT UNSIGNED NULL DEFAULT NULL,
  `work_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `mission_id` (`mission_id` ASC) VISIBLE,
  INDEX `member_id` (`member_id` ASC) VISIBLE,
  INDEX `work_id` (`work_id` ASC) VISIBLE,
  CONSTRAINT `mission_staff_ibfk_1`
    FOREIGN KEY (`mission_id`)
    REFERENCES `npuc_solis`.`mission` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `mission_staff_ibfk_2`
    FOREIGN KEY (`member_id`)
    REFERENCES `npuc_solis`.`member` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `mission_staff_ibfk_3`
    FOREIGN KEY (`work_id`)
    REFERENCES `npuc_solis`.`work_assignment` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`parents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`parents` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`parents` (
  `ID` VARCHAR(12) NOT NULL,
  `pname` VARCHAR(128) NULL DEFAULT NULL,
  `email` VARCHAR(64) NULL DEFAULT NULL,
  `home_address` VARCHAR(255) NULL DEFAULT NULL,
  `mobile` VARCHAR(20) NULL DEFAULT NULL,
  `relationship` VARCHAR(12) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`myparent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`myparent` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`myparent` (
  `ID` VARCHAR(12) NOT NULL,
  `student_id` INT UNSIGNED NULL DEFAULT NULL,
  `parent_id` VARCHAR(12) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  INDEX `parent_id` (`parent_id` ASC) VISIBLE,
  CONSTRAINT `myparent_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `npuc_solis`.`student` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `myparent_ibfk_2`
    FOREIGN KEY (`parent_id`)
    REFERENCES `npuc_solis`.`parents` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`or_trans`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`or_trans` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`or_trans` (
  `ID` VARCHAR(16) NOT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `receipt` VARCHAR(12) NULL DEFAULT NULL,
  `particular` VARCHAR(255) NULL DEFAULT NULL,
  `amount` DOUBLE(7,2) NULL DEFAULT NULL,
  `debit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `credit_account_id` VARCHAR(16) NULL DEFAULT NULL,
  `posted` ENUM('Yes', 'No') NULL DEFAULT NULL,
  `payment_type` ENUM('Cash', 'Check') NULL DEFAULT NULL,
  `account_id` VARCHAR(12) NULL DEFAULT NULL,
  `account_name` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `or_trans_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`pmonth`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`pmonth` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`pmonth` (
  `ID` VARCHAR(2) NOT NULL,
  `pay_month` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`posted_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`posted_list` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`posted_list` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `or_trans_id` VARCHAR(16) NULL DEFAULT NULL,
  `cash_posting_id` VARCHAR(32) NULL DEFAULT NULL,
  `receipt` VARCHAR(12) NULL DEFAULT NULL,
  `amount` DOUBLE(7,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `or_trans_id` (`or_trans_id` ASC) VISIBLE,
  INDEX `cash_posting_id` (`cash_posting_id` ASC) VISIBLE,
  CONSTRAINT `posted_list_ibfk_1`
    FOREIGN KEY (`or_trans_id`)
    REFERENCES `npuc_solis`.`or_trans` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `posted_list_ibfk_2`
    FOREIGN KEY (`cash_posting_id`)
    REFERENCES `npuc_solis`.`cash_posting_journal` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 42
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`quarter_period`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`quarter_period` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`quarter_period` (
  `ID` VARCHAR(7) NOT NULL,
  `grading_period_id` VARCHAR(1) NULL DEFAULT NULL,
  `grading_period` VARCHAR(24) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `quarter_period_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`receipt`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`receipt` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`receipt` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `or_trans_id` VARCHAR(32) NULL DEFAULT NULL,
  `or_number` VARCHAR(16) NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  `inwords` LONGTEXT NULL DEFAULT NULL,
  `remarks` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `or_trans_id` (`or_trans_id` ASC) VISIBLE,
  CONSTRAINT `receipt_ibfk_1`
    FOREIGN KEY (`or_trans_id`)
    REFERENCES `npuc_solis`.`or_trans` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 100000020
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`registration_year`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`registration_year` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`registration_year` (
  `ID` VARCHAR(7) NOT NULL,
  `registration_year_id` VARCHAR(2) NULL DEFAULT NULL,
  `school_year` VARCHAR(12) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `registration_year_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`remarks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`remarks` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`remarks` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NULL DEFAULT NULL,
  `remark` LONGTEXT NULL DEFAULT NULL,
  `encode_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `student_id` (`student_id` ASC) VISIBLE,
  CONSTRAINT `remarks_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `npuc_solis`.`student` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 192
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`saccount`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`saccount` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`saccount` (
  `ID` VARCHAR(32) NOT NULL,
  `reg_id` VARCHAR(16) NULL DEFAULT NULL,
  `date_reg` DATE NULL DEFAULT NULL,
  `balance` DOUBLE(9,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `reg_id` (`reg_id` ASC) VISIBLE,
  CONSTRAINT `saccount_ibfk_1`
    FOREIGN KEY (`reg_id`)
    REFERENCES `npuc_solis`.`registration` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_user_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_user_type` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_user_type` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_type` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_login` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_login` (
  `username` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NULL DEFAULT NULL,
  `type_id` INT UNSIGNED NULL DEFAULT NULL,
  `staff_id` INT UNSIGNED NULL DEFAULT NULL,
  `member_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`username`),
  INDEX `type_id` (`type_id` ASC) VISIBLE,
  INDEX `staff_id` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `school_login_ibfk_1`
    FOREIGN KEY (`type_id`)
    REFERENCES `npuc_solis`.`school_user_type` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `school_login_ibfk_2`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`school_staff` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`school_year`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`school_year` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`school_year` (
  `ID` VARCHAR(7) NOT NULL,
  `school_year_id` VARCHAR(2) NULL DEFAULT NULL,
  `school_year` VARCHAR(12) NULL DEFAULT NULL,
  `school_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `school_id` (`school_id` ASC) VISIBLE,
  CONSTRAINT `school_year_ibfk_1`
    FOREIGN KEY (`school_id`)
    REFERENCES `npuc_solis`.`school` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`semestral_term`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`semestral_term` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`semestral_term` (
  `ID` VARCHAR(1) NOT NULL,
  `semestral_term` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`sessions` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`sessions` (
  `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `expires` INT UNSIGNED NOT NULL,
  `data` MEDIUMTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `npuc_solis`.`sledger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`sledger` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`sledger` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` VARCHAR(16) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `reference` VARCHAR(16) NULL DEFAULT NULL,
  `or_number` VARCHAR(16) NULL DEFAULT NULL,
  `particular` VARCHAR(255) NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `account_id` (`account_id` ASC) VISIBLE,
  CONSTRAINT `sledger_ibfk_1`
    FOREIGN KEY (`account_id`)
    REFERENCES `npuc_solis`.`saccount` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1000120
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`stype`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`stype` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`stype` (
  `ID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`supplier`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`supplier` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`supplier` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier` LONGTEXT NULL DEFAULT NULL,
  `address` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`taccount`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`taccount` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`taccount` (
  `ID` VARCHAR(16) NOT NULL DEFAULT '',
  `staff_id` INT UNSIGNED NULL DEFAULT NULL,
  `balance` DOUBLE(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `staff_id` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `taccount_ibfk_1`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`school_staff` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`test_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`test_table` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`test_table` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(32) NULL DEFAULT NULL,
  `firstname` VARCHAR(32) NULL DEFAULT NULL,
  `middlename` VARCHAR(32) NULL DEFAULT NULL,
  `gender` ENUM('Male', 'Female') NULL DEFAULT NULL,
  `bday` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 10261
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`tledger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`tledger` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`tledger` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `taccount_id` VARCHAR(16) NULL DEFAULT NULL,
  `trandate` DATE NULL DEFAULT NULL,
  `reference` VARCHAR(16) NULL DEFAULT NULL,
  `particular` LONGTEXT NULL DEFAULT NULL,
  `amount` DOUBLE(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `taccount_id` (`taccount_id` ASC) VISIBLE,
  CONSTRAINT `tledger_ibfk_1`
    FOREIGN KEY (`taccount_id`)
    REFERENCES `npuc_solis`.`taccount` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`union_dept`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`union_dept` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`union_dept` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 109
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`union_assignment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`union_assignment` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`union_assignment` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `work_assignment` VARCHAR(128) NULL DEFAULT NULL,
  `dept_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `dept_id` (`dept_id` ASC) VISIBLE,
  CONSTRAINT `union_assignment_ibfk_1`
    FOREIGN KEY (`dept_id`)
    REFERENCES `npuc_solis`.`union_dept` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`union_user_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`union_user_type` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`union_user_type` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_type` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`union_staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`union_staff` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`union_staff` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `union_id` VARCHAR(1) NULL DEFAULT NULL,
  `member_id` INT UNSIGNED NULL DEFAULT NULL,
  `work_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `union_id` (`union_id` ASC) VISIBLE,
  INDEX `member_id` (`member_id` ASC) VISIBLE,
  INDEX `work_id` (`work_id` ASC) VISIBLE,
  CONSTRAINT `union_staff_ibfk_1`
    FOREIGN KEY (`union_id`)
    REFERENCES `npuc_solis`.`_union` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `union_staff_ibfk_2`
    FOREIGN KEY (`member_id`)
    REFERENCES `npuc_solis`.`member` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `union_staff_ibfk_3`
    FOREIGN KEY (`work_id`)
    REFERENCES `npuc_solis`.`union_assignment` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10002
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`union_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`union_login` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`union_login` (
  `username` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NULL DEFAULT NULL,
  `type_id` INT UNSIGNED NULL DEFAULT NULL,
  `staff_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`username`),
  INDEX `type_id` (`type_id` ASC) VISIBLE,
  INDEX `staff_id` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `union_login_ibfk_1`
    FOREIGN KEY (`type_id`)
    REFERENCES `npuc_solis`.`union_user_type` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `union_login_ibfk_2`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`union_staff` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`union_user_logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`union_user_logs` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`union_user_logs` (
  `ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `log_date` DATE NULL DEFAULT NULL,
  `log_time` VARCHAR(64) NULL DEFAULT NULL,
  `status` VARCHAR(16) NULL DEFAULT NULL,
  `username` VARCHAR(32) NULL DEFAULT NULL,
  `account_name` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `username` (`username` ASC) VISIBLE,
  CONSTRAINT `union_user_logs_ibfk_1`
    FOREIGN KEY (`username`)
    REFERENCES `npuc_solis`.`union_login` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`student_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`student_login` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`student_login` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NULL,
  `username` VARCHAR(45) NULL,
  `hash` VARCHAR(255) NULL,
  `salt` VARCHAR(255) NULL,
  `profile_picture` BLOB NULL,
  `statut` ENUM('Active', 'Pending', 'Disabled') NULL DEFAULT 'Pending',
  `code` VARCHAR(5) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `student_login_idx` (`student_id` ASC) VISIBLE,
  CONSTRAINT `student_login`
    FOREIGN KEY (`student_id`)
    REFERENCES `npuc_solis`.`student` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1000
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`web_sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`web_sessions` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`web_sessions` (
  `session_id` VARCHAR(128) NOT NULL,
  `expires` INT NULL,
  `data` MEDIUMTEXT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `npuc_solis`.`web_registration_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`web_registration_status` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`web_registration_status` (
  `registration_id` VARCHAR(16) NOT NULL,
  `grade_level` VARCHAR(32) NULL,
  `section` VARCHAR(32) NULL,
  `application_date` DATE NULL,
  `status` ENUM('Pending', 'Approved', 'Denied') NOT NULL DEFAULT 'Pending',
  `remarks` VARCHAR(256) NULL,
  PRIMARY KEY (`registration_id`),
  CONSTRAINT `link_to_regristration`
    FOREIGN KEY (`registration_id`)
    REFERENCES `npuc_solis`.`registration` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `npuc_solis`.`web_school_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`web_school_login` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`web_school_login` (
  `staff_id` INT UNSIGNED NOT NULL,
  `type_id` INT UNSIGNED NULL,
  `username` VARCHAR(45) NULL,
  `profile_picture` VARCHAR(128) NULL,
  `status` ENUM('Active', 'Disable') NULL DEFAULT 'Disable',
  `hash` VARCHAR(255) NULL,
  `salt` VARCHAR(255) NULL,
  `code` VARCHAR(5) NULL,
  PRIMARY KEY (`staff_id`),
  INDEX `user_to_type_idx` (`type_id` ASC) VISIBLE,
  CONSTRAINT `login_to_staff`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`school_staff` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_to_type`
    FOREIGN KEY (`type_id`)
    REFERENCES `npuc_solis`.`school_user_type` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Table `npuc_solis`.`web_admin_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`web_admin_user` ;

CREATE TABLE IF NOT EXISTS `npuc_solis`.`web_admin_user` (
  `ID` VARCHAR(7) NOT NULL,
  `account_name` VARCHAR(45) NULL,
  `staff_id` INT UNSIGNED NULL,
  `hash` VARCHAR(255) NULL,
  `salt` VARCHAR(255) NULL,
  `code` VARCHAR(5) NULL,
  PRIMARY KEY (`ID`),
  INDEX `admin_to_staff_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `admin_to_staff`
    FOREIGN KEY (`staff_id`)
    REFERENCES `npuc_solis`.`school_staff` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- Placeholder table for view `npuc_solis`.`vw_bong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `npuc_solis`.`vw_bong` (
  `ID` INT, 
  `balance` INT, 
  `taccount_id` INT, 
  `trandate` INT, 
  `reference` INT, 
  `particular` INT, 
  `amount` INT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- -----------------------------------------------------
-- View `npuc_solis`.`vw_bong`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `npuc_solis`.`vw_bong`;
DROP VIEW IF EXISTS `npuc_solis`.`vw_bong` ;
USE `npuc_solis`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `npuc_solis`.`vw_bong` AS select `npuc_solis`.`taccount`.`ID` AS `ID`,`npuc_solis`.`taccount`.`balance` AS `balance`,`npuc_solis`.`tledger`.`taccount_id` AS `taccount_id`,`npuc_solis`.`tledger`.`trandate` AS `trandate`,`npuc_solis`.`tledger`.`reference` AS `reference`,`npuc_solis`.`tledger`.`particular` AS `particular`,`npuc_solis`.`tledger`.`amount` AS `amount` from (`npuc_solis`.`taccount` left join `npuc_solis`.`tledger` on((`npuc_solis`.`taccount`.`ID` = `npuc_solis`.`tledger`.`taccount_id`)));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
