import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("user").title("Users"),
      S.documentTypeListItem("product").title("Product"),
      S.documentTypeListItem("collections").title("Collections"),
      S.documentTypeListItem("brands").title("Brands"),
      S.documentTypeListItem("colors").title("Colors"),
      S.documentTypeListItem("materials").title("Materials"),
      S.documentTypeListItem("categories").title("Categories"),
      S.documentTypeListItem("reviews").title("Reviews"),
      S.documentTypeListItem("flaggedReviews").title("Flagged Reviews"),
    ])
