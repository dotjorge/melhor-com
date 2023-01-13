// The hook way
import { createTRPCReact } from '@trpc/react-query'
// Needs await
// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// Backend
import type { AppRouter } from '../../../server/src/router'

// Needs await
// export const trpcAwaited = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:4000/trpc'
//     })
//   ]
// })

export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      /**
       * This function is called whenever a `.useMutation` succeeds
       **/
      async onSuccess(opts) {
        /**
         * @note that order here matters:
         * The order here allows route changes in `onSuccess` without
         * having a flash of content change whilst redirecting.
         **/
        // Calls the `onSuccess` defined in the `useQuery()`-options:
        await opts.originalFn()
        // Invalidate all queries in the react-query cache:
        await opts.queryClient.invalidateQueries()
      }
    }
  }
})
