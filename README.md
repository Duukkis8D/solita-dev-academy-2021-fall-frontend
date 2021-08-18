# Solita Dev Akatemia fall 2021 pre-assignment

## Purpose

The app is for Solita Dev Akatemia fall 2021 job application. It is meant to test the applicant's programming and problem solving skills. More info about assignment here: https://github.com/solita/vaccine-exercise-2021.

## Function

The app shows information from imaginary THL vaccination database (mockup data). First there is a section with statistics of the first/latest vaccine orders and vaccinations. Then comes a time machine section. It means that the (timestamped) order and vaccination information can be looked back in time by selecting date and time.

## Usage

The app can be started in https://solita-fall-2021-duukkis8d.herokuapp.com/.

Alternatively it can be started in local development environment by first cloning this repository to any directory.

After that, please change the value of `baseUrl` variable in this repository's src/services/orderService.js file to `'https://solita-fall-2021-duukkis8d.herokuapp.com/api/orders'`. Also, change the value of `baseUrl` in src/services/vaccinationService.js file to `'https://solita-fall-2021-duukkis8d.herokuapp.com/api/vaccinations'`.

Finally, the app is started by using `npm start` in the local repository directory. The app connects to the server specified in `baseUrl` variable. That server connects to mongoDB database which contains the vaccine order and vaccination data.