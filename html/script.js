function addMatchff(i, j) {
    let match = document.createElement('div');
    let addMatchesDiv = document.getElementById('allMatches');
    match.classList.add('match');
    match.innerHTML = `<div class="wrapper">
    <button  onclick="handleDeleteMatch(${i})" class="lws-delete">
        <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${i}</h3>
    </div>
    <div class="inc-dec">
    <form class="incrementForm">
        <h4>Increment</h4>
        <input onkeypress="handleIncrement(${i},event)" type="number" name="increment" class="lws-increment" />
    </form>
    <form class="decrementForm">
        <h4>Decrement</h4>
        <input  onkeypress="handleDecrement(${i},event)" type="number" name="decrement" class="lws-decrement" />
    </form>
    </div>
    <div class="numbers">
    <h2  class="lws-singleResult">${j}</h2>
    </div>`;
    addMatchesDiv.append(match);
    console.log(addMatchesDiv);



}

// function deleteMatch(button) {
//     let section = button.parentNode;
//     let match = section.parentNode
//     match.parentNode.removeChild(match);
// }

// state>>action>>dispatch>>reducer>>subscribe render>>state



//initialization
const initialState = {
    m: [{ id: 1, value: 0 }]
};

//action identifiers

const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';
const ADDMATCH = 'addmatch';
const DELETEMATCH = 'deletematch';



//action creators
const increment = (x, Value) => {
    return {
        type: INCREMENT,
        payload: Value,
        load: x
    };
}
const decrement = (x, Value) => {
    return {
        type: DECREMENT,
        payload: Value,
        load: x
    };
}
const addmatch = (x) => {
    return {
        type: ADDMATCH,
        load: x
    };
}
const deleteMatch = (x) => {
    return {
        type: DELETEMATCH,
        load: x
    };
}
const resetValue = () => {
    return {
        type: RESET,
    };
}

function stateReducer(state = initialState, action,) {
    if (action.type === INCREMENT) {
        return {
            ...state,
            m: state.m.map(n => n.id === action.load ? { ...n, value: n.value + action.payload } : n)
        }
    }
    else if (action.type === DECREMENT) {
        return {
            ...state,
            m: state.m.map(n => n.id === action.load ? { ...n, value: n.value - action.payload } : n)
        }
    }
    else if (action.type === RESET) {
        return {
            ...state,
            m: state.m.map(n => 1 ? { ...n, value: 0 } : n)
        }
    }
    else if (action.type === DELETEMATCH) {
        return {
            ...state,
            m: state.m.filter(n => n.id !== action.load)
        }
    }
    else if (action.type === ADDMATCH) {

        return {
            ...state,
            m: [...state.m, { id: action.load, value: 0 }]
        }
    }
    else {
        return state
    }
}

const store = Redux.createStore(stateReducer);

const render = () => {
    document.getElementById('allMatches').innerText = ''
    const state = store.getState();
    state.m.forEach(e => {
        if (e.value < 0) {
            e.value = 0;
        }
        addMatchff(e.id, e.value)
    });

}

render()

store.subscribe(render);

function handleIncrement(x, event) {
    if (event.keyCode === 13) {

        let Value = parseInt(event.target.value);

        store.dispatch(increment(x, Value))
        event.preventDefault(); // Prevent form submission if necessary

    }
}
function handleDecrement(x, event) {
    if (event.keyCode === 13) {
        let Value = parseInt(event.target.value);
        console.log(Value)
        store.dispatch(decrement(x, Value))

        event.preventDefault(); // Prevent form submission if necessary
    }
}
let x = 1;
function handleAddMatch() {
    x = x + 1;
    store.dispatch(addmatch(x))
}
function handleResetValue() {
    store.dispatch(resetValue())
}

function handleDeleteMatch(x) {
    store.dispatch(deleteMatch(x))
}
