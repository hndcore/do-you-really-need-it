import "@testing-library/jest-dom/vitest";
import "@/i18n";

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock;

Element.prototype.scrollIntoView = function scrollIntoView() {};
