export function AppLogo({ className }: { className: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="200 200 650 650"
        version="1.1"
        className={className}
      >
        <path
          d="M 324.500 248.021 C 307.035 250.608, 300.193 264.333, 293.355 310.500 C 293.110 312.150, 292.287 317.325, 291.525 322 C 284.028 368.020, 283.220 418.486, 289.887 424.427 C 301.181 434.493, 308.873 424.030, 309.040 398.373 C 309.233 368.502, 312.932 334.192, 320.183 295 C 323.293 278.192, 325.162 274.667, 330.959 274.667 C 338.027 274.667, 403.891 319.759, 431.500 343.500 C 443.081 353.458, 444.745 353.799, 458.358 348.994 C 471.027 344.522, 485.457 341.206, 504.472 338.398 C 515.361 336.790, 557.644 336.788, 565.500 338.396 C 567.150 338.734, 574.476 340.175, 581.781 341.598 C 589.085 343.022, 599.660 345.767, 605.281 347.698 C 622.955 353.771, 623.608 353.684, 636 343.567 C 641.775 338.852, 650.263 332.183, 654.862 328.747 C 678.845 310.828, 684.399 306.772, 694.520 299.780 C 720.586 281.774, 736.022 273.233, 739.574 274.852 C 748.099 278.736, 760 352.327, 760 401.156 C 760 421.950, 762.238 427, 771.454 427 C 785.372 427, 787.006 400.214, 777.543 327.149 C 766.927 245.176, 753.745 233.232, 706.500 262.775 C 689.181 273.604, 662.393 291.816, 650 301.185 C 643.125 306.382, 633.233 313.867, 628.019 317.817 C 617.451 325.822, 617.590 325.783, 609.531 323.011 C 574.052 310.804, 510.347 309.708, 467.859 320.573 C 447.415 325.800, 449.238 325.567, 446.745 323.278 C 439.859 316.957, 398.147 286.217, 380.913 274.761 C 346.801 252.088, 334.956 246.473, 324.500 248.021 M 346.518 339.750 C 344.749 357.155, 343.133 416, 344.424 416 C 344.765 416, 347.588 413.495, 350.699 410.434 C 364.293 397.055, 387.034 377.833, 400.390 368.432 C 402.457 366.977, 402.366 366.818, 396 360.697 C 385.924 351.009, 350.689 322, 348.998 322 C 348.627 322, 347.511 329.988, 346.518 339.750 M 712.228 327.411 C 704.215 333.310, 687.306 346.921, 677.664 355.235 C 673.354 358.950, 668.741 362.845, 667.414 363.889 C 663.900 366.653, 663.842 366.582, 678.961 377.771 C 693.097 388.233, 715.663 407.433, 720.305 412.950 C 721.716 414.628, 723.125 416, 723.435 416 C 724.695 416, 723.900 363.194, 722.464 351.500 C 721.654 344.900, 720.700 335.997, 720.345 331.716 C 719.543 322.060, 719.516 322.046, 712.228 327.411 M 376 437.092 C 346.569 439.769, 274.789 457.211, 268.876 463.124 C 267.209 464.791, 267 466.662, 267 479.949 C 267 497.138, 266.857 496.898, 280.365 502.484 C 292.719 507.592, 293.422 508.687, 294.513 524.500 C 302.717 643.330, 470.056 661.535, 501.334 547 C 503.222 540.086, 505.053 525.107, 504.833 518.384 C 504.395 505.045, 515.319 497, 533.868 497 C 550.994 497, 563.734 507.372, 562.262 520.118 C 560.866 532.201, 567.847 559.111, 576.240 574 C 615.452 643.565, 724.843 639.913, 761.086 567.828 C 769.003 552.083, 770.853 545.420, 773.410 523.447 C 775.193 508.125, 775.651 507.471, 788.099 502.477 C 801.647 497.042, 801.199 497.852, 800.821 479.454 C 800.473 462.588, 799.941 461.146, 793.521 459.686 C 792.409 459.433, 782.275 456.672, 771 453.550 C 665.961 424.465, 602.288 431.318, 573.509 474.807 C 570.238 479.750, 571.291 479.594, 562.154 476.493 C 544.139 470.379, 519.380 470.724, 501.839 477.333 C 495.179 479.843, 495.179 479.843, 491.737 474.660 C 471.668 444.432, 433.067 431.903, 376 437.092 M 387 458.582 C 338.367 464.204, 315.312 487.053, 318.471 526.500 C 325.399 613.027, 452.429 627.364, 477.959 544.500 C 494.203 491.776, 451.205 451.161, 387 458.582 M 648.512 459.107 C 607.793 463.392, 583.253 490.142, 586.451 526.755 C 594.557 619.563, 728.103 626.407, 748.045 535.035 C 759.261 483.647, 717.565 451.839, 648.512 459.107 M 357.913 484.840 C 338.096 497.408, 327.261 536.330, 341.743 542.929 C 349.843 546.619, 353.959 541.844, 355.004 527.548 C 356.065 513.015, 358.289 509.008, 372.386 496.222 C 382.157 487.359, 369.562 477.453, 357.913 484.840 M 626.660 484.114 C 607.292 494.332, 595.484 530.815, 608.106 541.436 C 615.718 547.841, 622.180 542.419, 623.113 528.845 C 624.161 513.587, 627.323 507.441, 639.295 497.390 C 649.215 489.063, 638.539 477.847, 626.660 484.114 M 507.077 588.589 C 499.139 595.268, 521.514 620.974, 534.205 619.754 C 548.483 618.382, 566.822 595.731, 559.545 588.455 C 555.600 584.509, 511.792 584.621, 507.077 588.589 M 311.763 627.508 C 305.520 631.026, 304.298 638.398, 308.702 645.968 C 389.904 785.508, 564.638 820.953, 692.291 723.779 C 707.980 711.835, 727.728 692.142, 736.223 679.969 C 737.170 678.611, 740.052 674.592, 742.627 671.037 C 756.481 651.914, 762.416 640.260, 760.993 634.976 C 757.298 621.253, 743.942 623.005, 734.861 638.402 C 731.209 644.595, 723.909 655.444, 720.328 660 C 704.433 680.225, 696.654 688.265, 680 701.683 C 570.448 789.943, 416.641 764.484, 337.566 645 C 324.665 625.507, 320.420 622.629, 311.763 627.508 M 529.388 632.980 C 526.142 634.291, 523.337 638.478, 521.002 645.495 C 515.444 662.194, 503.518 673.616, 485.527 679.469 C 472.838 683.596, 468.740 688.526, 472.132 695.580 C 479.514 710.932, 513.353 700.029, 530.794 676.678 C 532.902 673.855, 532.902 673.855, 541.701 682.744 C 562.183 703.433, 592.070 709.890, 595.365 694.338 C 596.955 686.835, 592.867 682.115, 582.500 679.481 C 564.684 674.955, 553.132 664.228, 546.627 646.172 C 541.905 633.065, 537.507 629.700, 529.388 632.980"
          stroke="currentColor" // Set the stroke color if needed, or use currentColor to inherit from parent
          strokeWidth={"8px"}
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  }