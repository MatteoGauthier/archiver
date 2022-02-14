export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID as string

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
interface SendEventProps {
  action: string
  category: string
  label: string
  value?: string | number
}

export const sendGAEvent = ({ action, category, label, value }: SendEventProps): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
