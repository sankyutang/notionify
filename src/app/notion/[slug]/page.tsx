
// import Image from 'next/image'
import * as React from 'react'
import { NextPage } from "next";

import { ExtendedRecordMap } from 'notion-types'

import * as notion from '@/lib/notion'
import { NotionPage } from '@/components/NotionPage'
import {
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId
} from '@/lib/config'

interface PageProps {
  params: {
    slug: string
  }
}

const getPageData = async () => {
  const pageId = rootNotionPageId
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

// export async function generateStaticParams() {
//   const pageId = rootNotionPageId
//   const recordMap = await notion.getPage(pageId)
 
//   return {
//     props: {
//       recordMap
//     },
//     revalidate: 10
//   }
// }


// export default async function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  // export default async function Page() {
// eslint-disable-next-line @next/next/no-async-client-component
const Page: NextPage<PageProps> = async (
  params
) => {
  

  const { props: { recordMap } } = await getPageData()

  // return <>next for notion page</>
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
    />
  )
}


export default Page