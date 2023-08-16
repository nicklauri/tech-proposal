<script lang="ts">
  import DemoInfo from "$lib/components/DemoInfo.svelte"
  import { UserColumns, virtualScrollList, type UserInfo } from "$lib/stores/table"
  import { onMount } from "svelte"
  import { createRoot, type Root } from "react-dom/client"
  import React from "react"
  import {
    DetailsList,
    DetailsListLayoutMode,
    PrimaryButton,
    SelectionMode,
    type IColumn,
    initializeIcons,
  } from "@fluentui/react"
  import { writable } from "svelte/store"

  const columnNames = Object.values(UserColumns)

  const e = React.createElement

  let reactRoot: Root

  let listEl: HTMLDivElement

  const columns: IColumn[] = [
    {
      key: UserColumns.avatar.name,
      name: UserColumns.avatar.title,
      fieldName: UserColumns.avatar.name,
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item) =>
        e("img", {
          src: item.avatar,
          width: 20,
        }),
    },
    {
      key: UserColumns.username.name,
      name: UserColumns.username.title,
      fieldName: UserColumns.username.name,
      minWidth: 100,
      isResizable: true,
    },
    {
      key: UserColumns.email.name,
      name: UserColumns.email.title,
      fieldName: UserColumns.email.name,
      minWidth: 100,
      isResizable: true,
    },
    {
      key: UserColumns.birthdate.name,
      name: UserColumns.birthdate.title,
      fieldName: UserColumns.birthdate.name,
      minWidth: 100,
      isResizable: true,
    },
  ]

  const setState = writable((items: UserInfo[]) => {})

  const ReactList = () => {
    const [items, setItems] = React.useState($virtualScrollList)

    React.useEffect(() => {
      $setState = setItems
    }, [])

    return e(DetailsList, {
      items: items,
      compact: true,
      columns: columns,
      selectionMode: SelectionMode.multiple,
      setKey: "multiple",
      layoutMode: DetailsListLayoutMode.justified,
      isHeaderVisible: true,
      // selection: this._selection,
      selectionPreservedOnEmptyClick: true,
      // onItemInvoked: this._onItemInvoked,
      enterModalSelectionOnTouch: true,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "select row",
    })
  }

  $: {
    console.log(`set new items!`)
    $setState($virtualScrollList)
  }

  onMount(() => {
    initializeIcons()

    reactRoot = createRoot(listEl)

    reactRoot.render(e(ReactList, { items: $virtualScrollList }))

    // const interval = setInterval(() => {
    //   virtualScrollList.loadMore(100)
    // }, 5000)

    return () => {
      // clearInterval(interval)
      reactRoot.unmount()
    }
  })
</script>

<div bind:this={listEl} class="h-[400px] overflow-auto mt-3" />
