'use client';

import FadeIn from '@/components/animation/FadeIn';
import React from 'react';

const BottomText = () => {
  return (
    <FadeIn delay={0.9} direction="up">
      <div className="border-t border-gray-300 pt-6">
        <div className="text-center text-sm text-gray-500">
          <p>Need help? <a href="/help" className="text-blue-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </FadeIn>
  );
};

export default BottomText;
