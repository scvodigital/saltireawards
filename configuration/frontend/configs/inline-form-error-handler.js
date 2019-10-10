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
            method: "POST",
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
                    type: "run",
                    config: { "code" : { __template: "console.log('FORM RESPONSE (default):', data.submitRequest);" } }
                  },
                  {
                    type: "elementManipulator",
                    config: {
                      ">": { removeClass: "disabled" },
                      "#active-form-message": { styles: { display: "block" } },
                      "#form-message": { contents: { __template: "\{{jquery rootElement 'data' (split 'success-message') '}}" } }
                    }
                  }
                ]
              },
              error: {
                tasks: [
                  {
                    type: "run",
                    config: { "code" : { __template: "console.log('FORM RESPONSE (error):', data.submitRequest);" } }
                  },
                  {
                    type: "elementManipulator",
                    config: {
                      ">": { removeClass: "disabled" },
                      "#active-form-message": { styles: { display: "block" } },
                      "#form-message": { contents: { __template: "\An error has occurred, PERFORM_DEFAULT_ACTION!" } }
                    }
                  }
                ]
              },
              saveHoursData: {
                tasks: [
                  {
                    type: "elementManipulator",
                    config: {
                      ">": { removeClass: "disabled" },
                      "#active-form-message": { styles: { display: "block" } },
                      "#form-message": { contents: { __template: "Hours not saved, PERFORM_DEFAULT_ACTION!" } }
                    }
                  }
                ]
              },
              saveTaskData: {
                tasks: [
                  {
                    type: "elementManipulator",
                    config: {
                      ">": { removeClass: "disabled" },
                      "#active-form-message": { styles: { display: "block" } },
                      "#form-message": { contents: { __template: "Task not saved, PERFORM_DEFAULT_ACTION!" } }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
