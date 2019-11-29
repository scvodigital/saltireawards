// noinspection JSAnnotator
return {
  click: {
    preventDefault: true,
    tasks: [
      {
        type: "elementManipulator",
        config: { "<form": { addClass: "disabled" } }
      },
      {
        name: "submitRequest",
        type: "request",
        config: {
          url: { __template: "\{{{jquery rootElement 'attr' (split 'href')}}}" },
          method: "DELETE",
          dataType: "json"
        }
      },
      {
        type: "elementManipulator",
        config: {">": {attributes: {"data-errorhandler-target": "<form"}}}
      },
      "error-handler",
      {
        name: "next-action",
        type: "switch",
        config: {
          which: {__template: "\{{#if (jquery rootElement 'data' (split 'next-task')) }}next_task{{/if}}"},
          branches: {
            default: {
              tasks: []
            },
            next_task: {
              tasks: [
                {__template : "{{jquery rootElement 'data' (split 'next-task') }}"} // <--- I.e name this task
              ]
            }
          }
        }
      }
    ]
  }
}


