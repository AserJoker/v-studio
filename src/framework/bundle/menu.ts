import { IMenuItem } from "../../types";

export default [
  {
    name: "file",
    displayName: "menu.file.name",
    children: [
      {
        name: "open",
        displayName: "menu.file.open.name",
        children: [
          {
            name: "file",
            displayName: "menu.file.open.file.name",
          },
          {
            name: "project",
            displayName: "menu.file.open.project.name",
          },
        ],
      },
      {
        name: "import",
        displayName: "menu.file.import.name",
      },
      {
        name: "export",
        displayName: "menu.file.export.name",
      },
    ],
  },
  {
    name: "setting",
    displayName: "menu.setting.name",
    children: [
      {
        name: "language",
        displayName: "menu.setting.language.name",
        children: [],
      },
    ],
  },
] as IMenuItem[];
