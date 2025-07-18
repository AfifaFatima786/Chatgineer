<!-- ```javascript
function isPrimeOrFactors(number) {
// Handle edge cases: numbers less than 2 are not prime
if (number < 2) { return "Not prime" ; } // Check for divisibility from 2 up to the square root of the number

for (let i=2; i <=Math.sqrt(number); i++) { if (number % i===0) { // Found a factor, so it's not prime. Return the factors.
    const factors=[]; for (let j=1; j <=number; j++){ if (number % j===0){ factors.push(j); } } return factors; } } //
    No factors found, so it's prime return "Prime" ; } // Example usage: console.log(isPrimeOrFactors(2)); // Output:
    Prime console.log(isPrimeOrFactors(15)); // Output: [1, 3, 5, 15] console.log(isPrimeOrFactors(17)); // Output:
    Prime console.log(isPrimeOrFactors(20)); // Output: [1, 2, 4, 5, 10, 20] console.log(isPrimeOrFactors(1)); //
    Output: Not prime console.log(isPrimeOrFactors(0)); // Output: Not prime ```
    } -->



<!-- ```javascript

function isPrimeAndFactors(num) {
// Error handling for invalid input
if (!Number.isInteger(num)) {
throw new Error("Invalid input: Input must be an integer.");
}
if (num <= 1) { return { isPrime: false, factors: [] }; // 1 and numbers less than 1 are not prime } // Optimization:
    Check for divisibility by 2 first if (num % 2===0) { return { isPrime: false, factors: [2, num / 2] }; } //Efficient
    primality test: Check divisibility only up to the square root of the number. const sqrtNum=Math.sqrt(num); const
    factors=[]; for (let i=3; i <=sqrtNum; i +=2) { //Only odd numbers after 2 need to be checked. if (num % i===0) {
    factors.push(i, num / i); //Found a factor, add it and its pair break; //No need to continue after finding the first
    factor pair } } return { isPrime: factors.length===0, factors }; } // Test cases - showcasing robust handling of
    edge cases console.log(isPrimeAndFactors(2)); // { isPrime: true, factors: [] } console.log(isPrimeAndFactors(3));
    // { isPrime: true, factors: [] } console.log(isPrimeAndFactors(4)); // { isPrime: false, factors: [2, 2] }
    console.log(isPrimeAndFactors(9)); // { isPrime: false, factors: [3, 3] } console.log(isPrimeAndFactors(15)); // 
    {
    isPrime: false, factors: [3, 5] } console.log(isPrimeAndFactors(97)); // { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(100)); // { isPrime: false, factors: [2, 50] } console.log(isPrimeAndFactors(1)); // 
    {
    isPrime: false, factors: [] } console.log(isPrimeAndFactors(0)); // { isPrime: false, factors: [] }
    console.log(isPrimeAndFactors(-5)); // { isPrime: false, factors: [] } //Error handling test case try{
    console.log(isPrimeAndFactors(3.14)); // Throws an error } catch(e){ console.error("Error:", e.message); } ```
     -->

```javascript
function isPrimeOrFactors(number) {
// Handle edge cases: numbers less than 2 are not prime
if (number < 2) { return "Not prime" ; } // Check for divisibility from 2 up to the square root of the number
// 
for (let i=2; i <=Math.sqrt(number); i++) { if (number % i===0) {
         // Found a factor, so it's not prime. Return the factors.
    const factors=[]; //Efficiently find all factors 
    
     for(let j=1; j <=Math.sqrt(number); j++) { if (number % j===0) {
    factors.push(j); if (j * j !==number) { factors.push(number / j); } } } factors.sort((a,b)=> a-b); //Sort factors in ascending order.
    return factors;
    }
    }

    // No factors found, it's prime
    return "Prime";
    }


    // Example usage:
    console.log(isPrimeOrFactors(2)); // Output: Prime
    console.log(isPrimeOrFactors(10)); // Output: [1, 2, 5, 10]
    console.log(isPrimeOrFactors(17)); // Output: Prime
    console.log(isPrimeOrFactors(25)); // Output: [1, 5, 25]
    console.log(isPrimeOrFactors(1)); // Output: Not prime
    console.log(isPrimeOrFactors(0)); // Output: Not prime
    console.log(isPrimeOrFactors(36)); // Output: [1, 2, 3, 4, 6, 9, 12, 18, 36]

    ```