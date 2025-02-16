import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("user").title("Users"),
      S.documentTypeListItem("product").title("Product"),
      S.documentTypeListItem("collections").title("Collections"),
      S.documentTypeListItem("reviews").title("Reviews"),
    ])
