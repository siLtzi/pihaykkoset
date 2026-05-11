import { StructureBuilder } from 'sanity/structure'
import { 
  Settings, 
  FileText, 
  Menu, 
  Globe,
} from 'lucide-react'

// Helper to create singleton list item
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon: React.ComponentType
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    )

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Settings
      S.listItem()
        .title('Settings')
        .icon(Settings)
        .child(
          S.list()
            .title('Settings')
            .items([
              singletonListItem(S, 'siteSettings', 'Site Settings', Settings),
              S.divider(),
              S.listItem()
                .title('Navigation Menus')
                .icon(Menu)
                .child(
                  S.documentTypeList('navigation')
                    .title('Navigation Menus')
                ),
            ])
        ),
      
      S.divider(),
      
      // Pages
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .icon(Globe)
                .child(
                  S.documentList()
                    .title('Homepage')
                    .filter('_type == "page" && isHomepage == true')
                ),
              S.divider(),
              S.listItem()
                .title('All Pages')
                .icon(FileText)
                .child(
                  S.documentTypeList('page')
                    .title('All Pages')
                ),
            ])
        ),
    ])

// Default document node
export const defaultDocumentNode = (S: StructureBuilder, { schemaType }: { schemaType: string }) => {
  return S.document()
}
