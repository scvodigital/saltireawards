return {
  typeaheadOptions: {
    highlight: true,
      minlength: 3
  },
  datasets: [
    {
      name: "org_lookup",
      display: "title",
      bloodhound: {
        datumTokenizer: "objWhitespace",
        datumTokenizerField: "other",
        queryTokenizer: "whitespace",
        remote: {
          url: "/org-lookup?q=*",
          wildcard: "*"
        }
      }
    },
  ],
    itemSelectedTasks: [
  {
    type: "elementManipulator",
    config: {
      ">.tt-input": { value: { __pointer: "metadata.suggestion.title" } },
      "#location": { value: { __pointer: "metadata.suggestion.location" } },
      "#organisation_charity_number": { value: { __pointer: "metadata.suggestion.registered_charity_number" } }
    }
  },
  {
    type: "elementManipulator",
    config: {
      ">.tt-menu": { styles: { display: "none !important" } }
    }
  }
],
  clearIfNothingSelected: true,
  nothingSelectedTasks: [
  {
    type: "elementManipulator",
    config: {
      "#location": { value: "" },
      "#organisation_charity_number": { value: "" }
    }
  }
  // {
  //   type: "run",
  //   config: { code: "metadata.instance.clearSelection()" }
  // }
]
}
