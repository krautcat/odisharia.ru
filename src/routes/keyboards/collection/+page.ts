import type { Load } from '@sveltejs/kit'
import {
  type ApiResponseInterface,
  type ErrorResponseInterface,
  ApiResponse,
  ErrorResponse,
  loadKeyboards
} from '$lib/ts/api/keyboards'
import type { LoadResponse } from './$types'

export async function load(params: Load): Promise<LoadResponse | ErrorResponse> {
  const page: number = params.url.searchParams.has('page')
    ? +params.url.searchParams.get('page')
    : 1

  let apiResponseObject: ApiResponseInterface | ErrorResponseInterface | undefined =
    undefined
  try {
    apiResponseObject = await loadKeyboards(page)
  } finally {
  }

  if (apiResponseObject === undefined) {
    return {
      error: 'Load data from external API error'
    }
  } else {
    switch (apiResponseObject.constructor) {
      case ApiResponse:
        return {
          total: apiResponseObject.total,
          per_page: apiResponseObject.per_page,
          items_on_page: apiResponseObject.items_on_page,
          items: apiResponseObject.items
        }
      case ErrorResponse:
        return {
          error: apiResponseObject.error
        }
    }
  }
}
