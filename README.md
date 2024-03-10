# Job Hunt CRM

## Description

A client relationship manager for tracking applications with different companies. By default, each job application campaign will have six stages: An initial application and five follow ups that can be done via email, phone, instant message, or in person.

## Table of Contents

- [Set-Up](#set-up)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Set-Up

1. Clone the project using the following link: https://github.com/Sergio-pada/client-relationship-manager

2. Create a postgres database with columns: company_id(int), url(varchar 500), contact(varchar 255), step(int), next_date(date), notes(text), company(varchar 50), position(varchar 50).

3. Edit the client object in index.js to reflect your database information.

4. Edit the messages in /views/company.ejs, replacing the words in square brackets with your own information and rewording to highlight your qualifications.

5. Run project with node.js

6. Open project at http://localhost:3000/

## Usage

1. Upon opening the home page for the first time, you will be prompted to insert data on a new application you've turned in. Once you submit the new application form, that data will be stored in your database along with the date of your next follow up with that company.
2. If you are a returning user and you have a follow up scheduled for today, you will be provided a link to the company page for theat application. This page will display all the application/company info as well as a message depending on what follow up you're currently on. This script can be edited for use with your preferred comunication method.
3. Once your mesage is sent, click the "Step Completed" button to increment the current step and to be reminded to follow up again the following week with a new message(unless youre on the final step of the campaign).

## Contributing

Guidelines on how to contribute to the project.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Contact information for the project maintainer.
