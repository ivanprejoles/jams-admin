import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export function truncateText(text: unknown, maxLength: number = 30): string {
  const stringText = typeof text === 'string' ? text : String(text || '');
  return stringText.length > maxLength ? stringText.slice(0, maxLength) + '' : stringText;
}

const formatProducts = (orderItems: any[]) => {
  // Format the products with sizes and colors in the desired format
  const formattedWithBr = orderItems
    .map((orderItem, index) => {
      const sizes = orderItem.sizes.join(", ");
      const colors = orderItem.colors.join(", ");
      return `${index + 1}. ${orderItem.product.name} (${orderItem.quantity})<br />   <b>Sizes:</b> ${sizes}<br />   <b>Colors:</b> ${colors}`;
    })
    .filter(Boolean)
    .join("<br /><br />"); // Filter out empty strings and join with line breaks

  const formattedWithoutBr = orderItems
    .map((orderItem, index) => {
      const sizes = orderItem.sizes.join(", ");
      const colors = orderItem.colors.join(", ");
      return `${index + 1}. ${orderItem.product.name} (${orderItem.quantity})   Sizes: ${sizes}   Colors: ${colors}`;
    })
    .filter(Boolean)
    .join("\n"); // Filter out empty strings and join with newline

  return { formattedWithBr, formattedWithoutBr }; // Return both formatted strings
};