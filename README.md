# Project Management Form (JsonPowerDB)

A web-based **Project Management Form** built using HTML, CSS, JavaScript, and **JsonPowerDB (JPDB)** for the Login2Xplore Micro Project.

## Database Details
* **Database Name:** `COLLEGE-DB`
* **Relation Name:** `PROJECT-TABLE`
* **Primary Key:** `Project-ID`
* **Fields:** `Project-ID`, `Project-Name`, `Assigned-To`, `Assignment-Date`, `Deadline`

## Features
* **Primary Key Check (`GET_BY_KEY`):** Automatically checks whether a `Project-ID` already exists in the database.
* **Save New Record (`PUT`):** Enables form fields and the **Save** button when a new `Project-ID` is entered.
* **Update Existing Record (`UPDATE`):** Loads existing record details, locks `Project-ID`, and enables the **Update** button.
* **Reset & Validation:** Validates non-empty fields and resets the form cleanly to its initial state.

## How to Run
1. Open `script.js` and add your JsonPowerDB Connection Token in `connToken`.
2. Serve the folder using a local server (such as `python -m http.server 8000`) and open `index.html` in your browser.
