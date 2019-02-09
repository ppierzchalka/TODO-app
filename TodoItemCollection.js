const todoItemFunctions = (state) => ({
  count: () => {
    return state.data.length;
  },
  add: (todo) => {
    if (state.data.filter(obj => obj.id === todo.id).length === 0) {
      state.data.push(todo);
    }
  },
  remove: (id) => {
    const toRemove = state.data.indexOf(state.data.filter(item => item.id === id)[0]);
    if (toRemove >= 0) {
      state.data.splice(toRemove, 1);
    }
  },
  print: () => {
    return state.data;
  },
  displayCompleted: () => {
    return state.data.filter(elem => elem.completed === true);
  }
});
const todoItemCollection = function(arr) {
  let state = {
    data: arr ? arr : []
  }
  return Object.assign({}, todoItemFunctions(state));
}

/**
 * normally you would have tests in separate files
 * but since we are doing browser without any transpilation let's have below actual code
 * the purpose of each unit test is to check one feature in as much isolation as possible
 */
testSuite("todoItemCollection", function(unitTest) {

  const item1 = {
    id: 1
  };
  const item2 = {
    id: 2
  };
  const item3 = {
    id: 3
  };
  const item4 = {
    id: 4
  };

  unitTest("should have count() method", function(assert) {
    const items = todoItemCollection([item1, item2, item3]);
    assert(items.count() === 3);
  });

  unitTest("adding should be possible", function(assert) {
    const items = todoItemCollection([item1, item2, item3]);
    items.add(item4);
    assert(items.count() === 4);
  });

  unitTest("adding existing items twice should not be possible", function(assert) {
    const items = todoItemCollection([item1, item2, item3]);
    items.add(item3);
    assert(items.count() === 3);
  });

  unitTest("removing should be possible", function(assert) {
    const items = todoItemCollection([item1, item2, item3]);
    items.remove(item2.id);
    assert(items.count() === 2);
  });

  unitTest("removing not existing items should not be possible", function(assert) {
    const items = todoItemCollection([item1, item2, item3]);
    items.remove(item4.id);
    assert(items.count() === 3);
  });

});
