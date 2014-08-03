//Project By Ralph Samuel
//

/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : n === 0 ? [] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    //If Array, call iterator on each element
    if (Array.isArray(collection)){ 
      for (var i=0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
      return;

    //If Object, call iterator on each enumerable, own(?) property
    }else if(Object.prototype.toString.call(collection) == '[object Object]'){
      for (var key in collection){
        if (collection.hasOwnProperty(key)){
          iterator(collection[key], key, collection);
        }else{
          console.log('Skipping property ' + key); //log property if not Object's own
        }
      }
      return;

    //Neither object nor array
    }else{
      console.log("Collection type unrecognized or null.");
      return;
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];

    for (var i=0; i<collection.length; i++) {
      if (test(collection[i], i)){
        results.push(collection[i]);
      }
    }

    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection, function(item, index){
      return ! test(item, index);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    return _.filter(array, function(item, index){
      //assumes indexOf() always returns first index of item as per ECMAScript 5.1
      return (index === array.indexOf(item)); 
    });
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // Assumes collection is an array
    var results = [];

    for (var i=0; i<collection.length; i++){
      results.push(iterator(collection[i], i));
    }
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item, index){
      return Object.prototype.toString.call(functionOrKey) == '[object Function]' 
      ? functionOrKey.apply(item, args)
      : item[functionOrKey].apply(item, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    //If Array:
    if (Array.isArray(collection)){
      //Set accumulator to default if not provided
      if (accumulator === undefined) var accumulator = collection[0];
      //Apply Iterator to array elements
      for (var i=0; i<collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator;
    
    //If Object:
    }else if(Object.prototype.toString.call(collection) == '[object Object]'){
      //Set accumulator to default if not provided
      if (accumulator === undefined) var accumulator = Object.keys(collection)[0];
      //Apply Iterator to Object's own, enumerable properties.
      for (var key in collection){
        if (collection.hasOwnProperty(key)){
          accumulator = iterator(accumulator, collection[key]);
        }
      }
      return accumulator;
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    //setup _.identity as default iterator if needed
    if(arguments.length < 2) var iterator = _.identity;

    //Use _.reduce to iterate
    return _.reduce(collection, function(allPass, item){
      if(! iterator(item)) allPass = false;         //truth test
      return allPass === false ? false : allPass;   //exit condition or continue
    }, true);
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
      // TIP: There's a very clever way to re-use every() here.
  _.some = function(collection, iterator) {
    //setup _.identity as default iterator if needed
    if(arguments.length < 2) var iterator = _.identity;

    if (!_.every(collection, function(value, index){
      return ! iterator(value, index);
    })) {
      //then
      return true;
    }else{
    return false;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var passedObjects = Array.prototype.slice.call(arguments, 1);

    for (var i=0, length=passedObjects.length; i<length; i++){
      for (var prop in passedObjects[i]){
        if (passedObjects[i].hasOwnProperty(prop)){
          obj[prop] = passedObjects[i][prop];
        }
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var passedObjects = Array.prototype.slice.call(arguments, 1);

    for (var i=0, length=passedObjects.length; i<length; i++){
      for (var prop in passedObjects[i]){
        if (passedObjects[i].hasOwnProperty(prop) && !obj.hasOwnProperty(prop)){
          obj[prop] = passedObjects[i][prop];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    //Prepare memoized version of func
    var memoizedFunction = function(arg){
      //Declare cache var, local to both closure function, and higher-order function for persistence
      var functionCache = memoizedFunction.functionCache;

      //If result of function(arg) not in cache, return computed result and add to cache
      if (!functionCache.hasOwnProperty(arg)){
        functionCache[arg] = func.call(this, arg);
      }
      //memoizedFunction() returns result from cache
      return functionCache[arg];
    };
    //Initialize clean cache for memoizedFunction()
    memoizedFunction.functionCache = {};
    //_.memoize() returns memoized version of func
    return memoizedFunction;  
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var args = Array.prototype.slice.call(arguments, 2);

    return setTimeout(function(){return func.apply(null, args);}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copiedArray = array.slice(0);
    var shuffledArray = [];

    while (copiedArray.length>0){
      var randomIndex = Math.floor(Math.random() * array.length);
      
      if (shuffledArray[randomIndex] == null) {
        shuffledArray[randomIndex] = copiedArray.pop();
      }
    }

    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
 
  _.sortBy = function(collection, iterator) {
    //***********************
    //>>>>>>>>>  N.B.  <<<<<<<<<<<<
    //********
    //_.sortBy() works with Safari. fails with chrome v8 js engine. 
        //Sorting is unstable. Uses quicksort.  
        //Discusion (v8 bug): https://code.google.com/p/v8/issues/detail?id=90
        //One workaround: http://stackoverflow.com/questions/3195941/sorting-an-array-of-objects-in-chrome 
            //Not implemented because must add new, nunenumerable prop on point object. Please advise.
    //It seems no help from underscore as underscore function is for diferent purpose
    
    var result = collection.slice(0);

    //If iterator is String
    if (typeof iterator == 'string'){      
      //sort by that sting/key
      result.sort(function(a, b){
        return a[iterator] - b[iterator];
      });
      return result;
    }

    //If iterator is function
    if (iterator instanceof Function){
      result.sort(function(a, b){
        //sort by given criterion
        return iterator(a) - iterator(b);
      });
      return result;
    }

  };
  

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]

  _.zip = function() {

    //****Dificulty finding good functional solution. 
    //*****potential leaks marked with asterisks

    //set up sorted arguments array 
    //********uses sort()*******
    var sortedArgs = Array.prototype.slice.call(arguments, 0).sort(function(a, b){
      return  b.length - a.length;
    });

    //Make new array with array-ified versions of all items in longest array from args
    //*******uses shift() on sortedArguments *********
    var result = _.map(sortedArgs.shift(), function(item, index){
      var arrayVersion = [item];
      return arrayVersion;
    });
   
   //push to each array in result, from appropriate values in other arrays in sorted arguments 
   //***********uses shift() on source arays************
    _.each(result, function(resultTargetArray){
      return _.each(sortedArgs, function(otherArray){
        return resultTargetArray.push(otherArray.shift());
      });
    });

    return result;
  };


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray) { //*****Removed 'result' arguments[1]
    
    return  _.reduce(nestedArray, function(a,b){  
      //if item is array, recurse
      if (b instanceof Array){
        return a.concat(_.flatten(b));

      }else{ //else if item is not array, concat to result
        return (a.concat(b));
      }
    },[]);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments, 0);

    //unique<--flatten--<map args<--filter each array for<--_.every array in arg<--_.contains current item
    return _.uniq(_.flatten(_.map(args, function(arayFromArgs){
      
      return _.filter(arayFromArgs, function(itemFromArray){
        
        return _.every(args, function(arrayFromArgs){

          return _.contains(arrayFromArgs, itemFromArray);
        })
      });
    })));
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var oneArray = Array.prototype.slice.call(arguments, 0, 1)[0];
    var otherArrays = Array.prototype.slice.call(arguments, 1);
    
    return _.filter(oneArray, function(item){
      return !_.some(otherArrays, function(otherArray){
        return _.contains(otherArray, item);
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var clear = true;
    var queue = [];
    var cachedReturnValue;

    //setup timer to be started by throttledFuunction call
    var timer = function()
      {return setTimeout(function(){
        //If function call in queue, call it and restart timer
        if(queue.length>0){
          //start timer again
          timer();

          //return throttled function(args popped off queue),
          //and set to cachedReturnValue
          return cachedReturnValue = func.apply(queue[0][0], queue.shift()[1]);
        
        }else{
          clear = true;
          return;
        }
      }, wait);
    };

    var throttledFunction = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      
      //If clear: toggle clear flag, start timer, invoke func, and return & cache value
      if(clear){
        clear = false;
        timer();
        return cachedReturnValue= func.apply(this, args);
      }

      //If not clear: push function call to queue, and return cached Value
      if (!clear){
        queue.push([this, args]);
        return cachedReturnValue;
      }

      
    };

    return throttledFunction;
   
  };

}).call(this);
