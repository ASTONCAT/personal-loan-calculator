# Personal Loan Calculator

This online calculator calculates the monthly instalment based on the input parameters: loan amount, repayment period and optionally with or without insurance. Input values are entered using sliders or by typing into the input fields or using the arrow keys. Each time the input values change, the monthly instalment is recalculated.

![Calculator page](https://astoncat.com/media/calculator-page.jpg "The Calculator page")

## Demo

* [The Calculator page](https://personal-loan-calculator.vercel.app/)
* [The Setup page](https://personal-loan-calculator.vercel.app/setup)


## Built With

The application was created to practise Next/React JS and Redux. The calculation is obtained from the RapidAPI platform. The Redux Thunk Middleware is used to enable asynchronous logic that interacts with the Redux store, e.g. asynchronous API calls. The initial values are stored in the MongoDB database and can be changed via the Setup page.


## How It Works

Next.js will pre-render the Calculator page at build time using `getStaticProps` and then every 180 seconds. Therefore, when the initial values are changed via the Setup page, the changes do not take effect immediately, but only after the next page rendering. The Setup page itself, on the other hand, is rendered with each request using `getServerSideProps`. The goal was to try both Static Site Generation and Server-Side Rendering. Also the Calculator page should serve a large number of visits, while the Setup page should be used only occasionally, so page loading speed is not that important here.

Originally it was planned to use a spinner loader for which the `false/true` state is reserved in the Redux store. However, in the end it looks cooler without the spinner as the numbers gradually flip over like on some slot machine. 


## To-do

The next step is to make another language version to practise Next.js routing. It would also be nice to add a currency switcher.

