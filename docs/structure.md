# Program structure

This document is about frontend structure. Its goal is to describe the purpose of each component in the program.

The frontend of the program consists of components located in 'frontend/src/components'.

## Demo.jsx

The main view of the demo. Includes visual components, their borders and component menu.

## DemoClock.jsx

Demo time and the options related to that (speed, range and buttons).

## ElectricityPrice.jsx

Electricity price and consumption information in right bottom corner of the main page. Responsible for fetching the electricity prices from backend.

## EnergyComponent.jsx

Energy component info box shown on main view when mouse is over an energy component.

## EnergyComponentPage.jsx

Own pages of energy components. Can be accessed by clicking an energy component on main page.

## InformationPage.jsx

Information-page. Can be opened from the right top corner of the main page.

## NotFoundPage.jsx

Not found -page. User gets directed here if the page they are trying to access does not exist or can not be opened.

## RealtimeClock.jsx

Responsible for creating the real time for main page.

## WelcomePage.jsx

Welcome-page, starting page of the demo with description.
