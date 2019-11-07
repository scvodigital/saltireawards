// Disable a hyperlink after it has been clicked
return {
  click : {
    tasks : [
      {
        type: "elementManipulator",
        config: {
          ">": {addClass: "disabled"}
        }
      }
    ]
  }
}
