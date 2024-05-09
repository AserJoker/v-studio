import { Runtime } from "@/runtime";

export default (path?: string[]) => {
  return [
    {
      name: "add",
      displayName: "context.resource.add.name",
      children: [
        {
          name: "resource",
          displayName: "context.resource.add.resource.name",
        },
        {
          name: "folder",
          displayName: "context.resource.add.folder.name",
        },
      ],
      visible: () => {
        if (path) {
          const item = Runtime.theApp.$resource.getResource(path.join("#"));
          if (item) {
            return item.type === "set";
          }
        }
        return true;
      },
    },
    {
      name: "remove",
      displayName: "context.resource.remove.name",
      visible: () => path !== undefined,
    },
  ];
};
