return {
  click: {
    preventDefault: true,
    tasks: [
      {
        type: "elementManipulator",
        config: { ">": { addClass: "disabled" } }
      },
      {
        name: "submitRequest",
        type: "request",
        config: {
          url: { __template: "\{{{jquery rootElement 'attr' (split 'action')}}}" },
          method: { __template: "\{{coalesce (jquery rootElement 'attr' (split 'method')) 'POST'}}" },
          traditional : true,
          dataType: "json",
          data: {
            __template: `\{{{json key=(jquery rootElement 'data' (split 'field')) value= )}}}`,
            __parser: "json"
          }
        }
      },
      {
        type: "elementManipulator",
        config: {">": {attributes: {"data-errorhandler-target": ">"}}}
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


