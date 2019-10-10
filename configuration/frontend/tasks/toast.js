return {
  type: "multiTask",
  config: {
    tasks: [
      {
        type: "elementManipulator",
        config: {
          "#toaster": {
            createElement: {
              html: {
                __template: `
                  <div class="toast toast-{{coalesce data.toast.class "primary"}} toast-out" data-component="TasksTrigger" data-TasksTrigger='{
                    mouseover: {
                      tasks: [
                        {
                          type: "run",
                          config: { code: "console.log(\`TOAST HAS BEEN HOVERED OVER\`)" }
                        },
                        {
                          type: "elementManipulator",
                          config: { ">": { removeClass: "toast-out" } }
                        }
                      ]
                    }
                  }'>
                    <button class="btn btn-clear float-right"></button>
                    {{coalesce data.toast.message "No message provided"}}
                  </div>
                `
              }
            }
          }
        }
      },
      {
        type: "run",
        config: { code: "ComponentManager.requestUpdate()" }
      }
    ]
  }
}