# Project Description

The goal of this project is to create a dashboard that can be used to visualize data from the FBI Crime Data Explorer (CDE). The intended use case is to compare data between the state and national level. The FBI specifically states that the CDE data is not intended to be used to compare between states.

# Features

### Dashboard
After starting the project, it became evident that most of the work was going to involve creating the core dashboard code that can host any widget type. Thus, I took great care to create a reusable dashboard that can easily host other widget types in the future.
* Can create as many widgets as desired
* Allows saving/loading dashboards
* Clone widgets for easy data comparison

### FBI Crime Data Explorer Widget
This widget visualizes data from the FBI CDE.
These are the currently-supported datasets and their parameters:
* Counts of offense
  * Offense type
  * Location
* Offender Demographics
  * Offense Type
  * Location
  * Demographic
  * Year
  * Chart type
* Victim Demographics
  * Offense Type
  * Location
  * Demographic
  * Year
  * Chart type

# Technologies
* Front End
  * React
  * Typescript
  * Material UI
  * NVD3
* Back End
  * Node.js
  * Express
  * PostgreSQL

