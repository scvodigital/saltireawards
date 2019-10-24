return  {
  type: "multiTask",
  config: {
    tasks: [
      {
        name: "isFormValid",
        type: "call",
        config: {
          owner: {
            type: "HTMLElement",
            selector: ">"
          },
          functionName: "checkValidity"
        }
      },
      {
        __doNotCompile: true,
        type: "elementManipulator",
        config: {
          ">button": {
            attributes: {
              disabled: {
                __template: `
                  {{~#if data.isFormValid~}}
                    null
                  {{~else~}}
                    "disabled"
                  {{~/if~}}
                `,
                __parser: "json"
              }
            }
          }
        }
      }
    ]
  }
}
