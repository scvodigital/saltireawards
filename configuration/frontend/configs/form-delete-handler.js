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
          method: "EXTERMINATE",
          dataType: "json"
        }
      },
      {
        name: "errorHandle",
        type: "switch",
        __doNotCompile: true,
        config: {
          which: { __template: "\{{#unless (ifAny errors.submitRequest data.submitRequest.errors.[0])}}success\{{else}}\{{#if data.submitRequest.errors.[0].taskName}}{{data.submitRequest.errors.[0].taskName}}\{{else}}error\{{/if}}\{{/unless}}" },
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
                    message: {__template: "An error has occurred, \{{>contact-support}}"},
                    class: "error"
                  }
                },
                "toast"
              ]
            },
            success: {
              tasks: [
                {
                  name: "errorHandle",
                  type: "switch",
                  __doNotCompile: true,
                  config: {
                    which: {__template: "\{{#if (jquery rootElement 'data' (split 'success-destination')) }}destination{{else}}{{#if (jquery rootElement 'data' (split 'success-hide'))}}hide{{/if}}{{/if}}"},
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
                              message: {__template: "\{{coalesce (jquery rootElement 'data' (split 'success-message')) }} "},
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
                      },
                      hide: {
                        tasks: [
                          {
                            type: "elementManipulator",
                            config: {
                              ">": {addClass: "hide"}
                            }
                          }
                        ]
                      }

                    }
                  }
                }
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
                    message: {__template: "Task has not been saved, {{>contact-support}}" },
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


