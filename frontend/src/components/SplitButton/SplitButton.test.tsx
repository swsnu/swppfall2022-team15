// import SplitButton from "./SplitButton";
// import { render, screen } from "@testing-library/react";
//
// describe("SplitButton", () => {
//   it("should render", () => {
//     render(
//       <SplitButton
//         mode={"test"}
//         options={["Reserve", "Fire Immediately"]}
//         setOpen={() => {}}
//       />
//     );
//   });
//
//   it("should handle click: immediate", () => {
//     const handleClick = jest.fn();
//     render(
//       <SplitButton
//         options={["Reserve", "Fire Immediately"]}
//         setOpen={handleClick}
//       />
//     );
//     const fireButton = screen.getByText("Fire Immediately");
//     fireButton.click();
//
//   });
//
//   it("should handle menu item click", () => {
//     const handleMenuItemClick = jest.fn();
//     render(
//       <SplitButton
//         options={["Reserve", "Fire Immediately"]}
//         setOpen={handleMenuItemClick}
//       />
//     );
//     const fireImmediatelyButton = screen.getByText("Fire Immediately");
//     fireImmediatelyButton.click();
//   });
//
//   it("should handle toggle", () => {
//     render(
//       <SplitButton
//         options={["Reserve", "Fire Immediately"]}
//         setOpen={() => {}}
//       />
//     );
//
//     const toggleButton = screen.getByTestId("toggle-button");
//     toggleButton.click();
//   });
//
// });
export {}