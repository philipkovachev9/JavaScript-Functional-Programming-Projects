import hh from 'hyperscript-helpers';
import * as R from 'ramda';
import { h } from 'virtual-dom';
import { showFormMsg, mealInputMsg, caloriesInputMsg, saveMealMsg } from './Update';
const { 
  div,
  h1,
  button,
  form,
  label,
  input,
  table,
  thead,
  tbody,
  tr,
  th,
  td
}  = hh(h);

function cell(tag, className, value) {
  return tag({ className }, value);
}

function mealRow(dispatch, className, meal) {
  return tr({ className }, [
    cell(td, 'pa2', meal.description),
    cell(td, 'pa2 tr', meal.calories),
    cell(td, 'pa2 tr', []),
  ])
}

const tableHeader = thead([
  tr([
    cell(th, 'pa2 tl', 'Meal'),
    cell(th, 'pa2 tr', 'Calories'),
    cell(th, '', ''),
  ]),
]);

function totalRow(meals) {
  const total = R.pipe(
    R.map(meal => meal.calories ),
    R.sum,
  )(meals);
  return tr({ className: 'bt b' }, [
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tr', total),
    cell(td, '', ''),
  ]);
}

function mealsBody(dispatch, className, meals) {
 const rows = R.map(
   R.partial(mealRow, [dispatch, 'stripe-dark']),
   meals);

   const rowsWithTotal = [...rows, totalRow(meals)];

   return tbody({ className }, rowsWithTotal);
}

function fieldSet(labelText, inputValue, oninput) {
 return div([
   label({className: 'db mb1'}, labelText),
   input({
     className: 'pa2 input-reset ba w-100 mb2',
     type: 'text',
     value: inputValue,
     oninput
   }),
 ]);
}

function tableView(dispatch, meals) {
  if(meals.length === 0) {
    return div({ className: 'mv2 i black-50'}, 'No meals to display...');
  }
  return table({ className: 'mv2 w-100 collapse' }, [
    tableHeader,
    mealsBody(dispatch, '', meals)
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      {
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit',
      },
      'Save'
    ),
    button({
      className: 'f3 pv2 ph3 bg-light-gray  bn mr2 dim',
      type: 'button',
      onclick: () => dispatch(showFormMsg(false))
    },
    'Cancel'
    )
  ]);
}


function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if(showForm) {
  return form( {
    className: 'w-100 mv2',
    onsubmit: e => {
      e.preventDefault();
      dispatch(saveMealMsg);
    }
  },
  [
   fieldSet('Meal', description, e => dispatch(mealInputMsg(e.target.value)) ),
   fieldSet('Calories', calories || '', e => dispatch(caloriesInputMsg(e.target.value)) ),
   buttonSet(dispatch),
   ]
  )
  }
  return button(
    { className: 'f3 pv2 ph3 bg-blue white bn',
     onclick: () => dispatch(showFormMsg(true)),
   },
   'Add Meal'
  )

 }

function view(dispatch, model) {
  return div({className: 'mw6 center' }, [
    h1({className: 'f2 pv2 bb'}, 'Calorie Counter'),
    formView(dispatch,model),
    tableView(dispatch, model.meals),
    
  ]);
}

export default view;