FormStack
---------

FormStack layout::

  formStack: {
    stack: [{},{},...] // list with entries that populate the stack
    index: int // current index of the stack, -1 when the stack is empty
    originPath: string // path of location to return to once stack is empty
  }
