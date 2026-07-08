import { StructureBuilder } from 'sanity/structure'
import { Settings, FileText, Menu, Home } from 'lucide-react'

const singleton = (
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon: React.ComponentType
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document().schemaType(typeName).documentId(typeName).title(title)
    )

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Sisältö')
    .items([
      singleton(S, 'homePage', 'Etusivu', Home),
      S.divider(),
      singleton(S, 'siteSettings', 'Yritystiedot ja yhteystiedot', Settings),
      S.divider(),
      S.listItem()
        .title('Muut sivut')
        .icon(FileText)
        .child(S.documentTypeList('page').title('Muut sivut')),
      S.listItem()
        .title('Navigaatiot')
        .icon(Menu)
        .child(S.documentTypeList('navigation').title('Navigaatiot')),
    ])

export const defaultDocumentNode = (S: StructureBuilder) => S.document()
