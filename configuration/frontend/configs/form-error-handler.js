return {
  submit: {
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
          url: { __template: "\{{jquery rootElement 'attr' (split 'action')}}" },
          method: { __template: "\{{coalesce (jquery rootElement 'attr' (split 'method')) 'POST'}}" },
          dataType: "json",
          data: {
            __template: `\{{{json value=(parse (jquery null "serialize" context=metadata.instance.element) type="querystring")}}}`,
            __parser: "json"
          }
        }
      },
      {
        name: "errorHandle",
        type: "switch",
        __doNotCompile: true,
        config: {
          which: { __template: "\{{#if errors.submitRequest}}error\{{else}}\{{data.submitRequest.errors.[0].taskName}}\{{/if}}" },
          branches: {
            default: {
              tasks: [
                {
                  name: "errorHandle",
                  type: "switch",
                  __doNotCompile: true,
                  config: {
                    which: {__template: "\{{#if (jquery rootElement 'data' (split 'success-destination')) }}destination{{/if}}"},
                    branches: {
                      default: {
                        tasks: [
                          {
                            type: "elementManipulator",
                            config: {
                              ">": {removeClass: "disabled"},
                            }
                          },
                          {
                            name: "toast",
                            type: "basic",
                            config: {
                              message: {__template: "\{{coalesce (jquery rootElement 'data' (split 'success-message')) }}"},
                              class: "success"
                            }
                          },
                          "toast"
                        ]
                      },
                      destination: {
                        tasks: [
                          {
                            type: "run",
                            config: {code: {__template: "window.location.href = '\{{jquery rootElement 'data' (split 'success-destination')}}' "}}
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            },
            error: {
              tasks: [
                {
                  type: "elementManipulator",
                  config: {
                    ">": {removeClass: "disabled"},
                  }
                },
                {
                  name: "toast",
                  type: "basic",
                  config: {
                    message: {__template: "An error has occurred, \{{>dummy}}" },
                    class: "success"
                  }
                },
                "toast"
              ]
            },
            saveHoursData: {
              tasks: [
                {
                  type: "elementManipulator",
                  config: {
                    ">": {removeClass: "disabled"},
                  }
                },
                {
                  name: "toast",
                  type: "basic",
                  config: {
                    message: {__template: "Hours have not been updated, \{{>contact-support}}" },
                    class: "error"
                  }
                },
                "toast"
              ]
            },
            saveTaskData: {
              tasks: [
                {
                  type: "elementManipulator",
                  config: {
                    ">": {removeClass: "disabled"},
                  }
                },
                {
                  name: "toast",
                  type: "basic",
                  config: {
                    message: {__template: "Task has not been saved, \{{>dummy}}" },
                    class: "error"
                  }
                },
                "toast"
              ]
            }
          }
        }
      }
    ]
  }
}


