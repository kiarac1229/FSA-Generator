// Sample FSA for O*
var fsa0 = {
  startState: "q1",
  transitions: [{ state: "q1", sym: "0", dest: "q1" }],
  acceptStates: ["q1"]
}
// FSA for 0(01)*
var fsa1 = {
  startState: "q1",
  transitions: [{ state: "q1", sym: "0", dest: "q2" },
  { state: "q2", sym: "0", dest: "q3" },
  { state: "q3", sym: "1", dest: "q2" }],
  acceptStates: ["q2"]
}
// FSA for 1(011)*0*
var fsa2 = {
  startState: "q1",
  transitions: [{ state: "q1", sym: "1", dest: "q2" },
  { state: "q2", sym: "0", dest: "q3" },
  { state: "q2", sym: "0", dest: "q5" },
  { state: "q3", sym: "1", dest: "q4" },
  { state: "q4", sym: "1", dest: "q2" },
  { state: "q5", sym: "0", dest: "q5" }],
  acceptStates: ["q2", "q5"]
}

// Generates words in an FSA
function generate(fsa) {
  var currentState = fsa.startState; // track our current state
  var word = ""; // word we are generating
  var accept = false; // boolean that lets us continue or exit loop

  do {
    // 0. If current state is accept state, decide if we should accept
    if (fsa.acceptStates.includes(currentState)) { // ask if current state is accept state
      randomAccept = Math.floor(Math.random() * 11) // random number between 0-10
      if (randomAccept > 8) { // random probability for accepting
        accept = true;
        break; // if decide to accept, don't need to determine transitions, so we can exit loop
      }
    }

    // 1. Get transitions for current state
    var currentTransitions = []; // array of possible transitions for current state
    for (transition of fsa.transitions) { // loop through all transitions in the FSA
      if (transition.state == currentState) { // check state property in each transition
        currentTransitions.push(transition); // add transition to the array
      }
    }

    // 2. Choose a transition randomly
    var numTransitions = currentTransitions.length; // gets length of the array of transitions 
    var randomTransition = Math.floor(Math.random() * numTransitions); // range from 0 to the number of transitions 
    var transition = currentTransitions[randomTransition]; // index the list of current transitions using our random number to choose a transition randomly

    // 3. Emit the letter/symbol on that transition 
    word = word.concat(transition.sym); // get symbol property of transition and concatenate symbol to word

    // 4. Change current state to new state
    currentState = transition.dest;
  }
  while (accept == false); // keep looping if we haven't accepted
  console.log(word); // output the final word
}

// Run program
//generate(fsa0);
generate(fsa1);
generate(fsa2);