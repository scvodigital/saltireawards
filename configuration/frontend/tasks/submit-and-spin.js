return {
  type: "multiTask",
  config: {
    tasks: [
      {
        type: "run",
        config: { code: "window.formHasChanged = false" }
      },
      {
        type: "elementManipulator",
        config: {
          ">": {addClass: "disabled"}
        }
      }
    ]
  }
}
