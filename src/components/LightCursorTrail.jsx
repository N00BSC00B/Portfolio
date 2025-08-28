/**
 * Lightweight CursorTrail - High performance alternative to Framer Motion version
 * Uses optimized RAF and minimal DOM manipulation
 */

import { useEffect, useAnimationConfig } from "../hooks/useAnimations";
import { createCursorTrail } from "../utils/lightAnimations";

export const LightCursorTrail = () => {
  const config = useAnimationConfig();

  useEffect(() => {
    // Only create cursor trail on devices that can handle it
    if (!config.canUseComplexAnimations) {
      return;
    }

    const cleanup = createCursorTrail(document.body);

    return cleanup;
  }, [config.canUseComplexAnimations]);

  // This component doesn't render anything directly
  return null;
};

export default LightCursorTrail;
