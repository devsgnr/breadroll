import Dataframe from "../object";

/**
 * Type Definition
 * Breadroll.open - the type definition for the return value of the open getter
 */
type BreadrollOpen = {
  local: (filepath: string) => Promise<Dataframe>;
  https: (url: string, headers?: Headers) => Promise<Dataframe>;
};

/**
 * Type Definition
 * DataframeReadOptions - the type definition for the parameter of the Breadroll second constructor argument
 */
type DataframeReadOptions = {
  header: boolean;
  delimiter: string;
  keys?: Array<string>;
};

/**
 * Type Definition
 * IOSave - the type definition for the return type of the IO.save getter method of the IO class
 */
type IOSave = {
  json: (location: string) => Promise<number>;
  csv: (location: string) => Promise<number>;
  tsv: (location: string) => Promise<number>;
};

/**
 * Types Definitions
 * Condition - the list of string allowed as identifiers for selecting filter functions
 * FilterType - the object type definition for the filter object
 */
type Condition = "==" | "!=" | "E" | "matches" | ">" | "<" | ">=" | "<=" | "is between";

type FilterType = {
  [key: string]: (dataframe: Array<ObjectType>, key: string, value: unknown, limit?: unknown) => Dataframe;
};

/**
 * Type Definition
 * ObjectType - the object type definition for the Dataframe object
 */
type ObjectType = {
  [key: string]: string | unknown;
};

/**
 * Type Definition
 * Indexer object for Dataframe.cols & Dataframe.rows - this object defines the named parameters for interger location indexing
 */
type Indexer = {
  start?: number;
  end?: number;
};

/**
 * Enumeration Definition
 * EscapeSeq - hold all the escape characters
 */
enum EscapeSeq {
  NEW_LINE = "\n",
  CARRIAGE_RETURN = "\r",
  HORIZONTAL_TAB = "\t",
  COMMA = ",",
}

type Apply = {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (value: any) => any;
  inplace?: boolean;
  newkey?: string;
};

/**
 * Type Definition
 * NumericConstantType - Constant Numeric Value
 */
type NumericConstantType = {
  math: {
    /**
     * The number π is a mathematical constant that is the ratio of a circle's circumference to its diameter, approximately equal to 3.14159. The number π appears in many formula
     */
    pi: number;
    /**
     * One turn is a unit of plane angle measurement equal to 2π radians, 360 degrees or 400 gradians. Thus it is the angular measure subtended by a complete circle at its center.
     */
    tau: number;
    /**
     * Pythagoras constant or Square root of 2 - Is a positive real number that, when multiplied by itself or squared, equals the number 2.
     */
    pythagoras_constant: number;
    /**
     * Theodorus constant or The square root of 3 is the positive real number that, when multiplied by itself, gives the number 3
     */
    theodorus_constant: number;
    /**
     * [Phi or golden ratio](https://www.wikiwand.com/en/Golden_ratio) - In mathematics, two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities.
     */
    phi: number;
    /**
     * [Silver ratio](https://www.wikiwand.com/en/Silver_ratio) - In mathematics, two quantities are in the silver ratio if the ratio of the smaller of those two quantities to the larger quantity is the same as the ratio of the larger quantity to the sum of the smaller quantity and twice the larger quantity.
     */
    silver_ratio: number;
    /**
     * [Supergolden ratio](https://www.wikiwand.com/en/Supergolden_ratio) - In mathematics, the supergolden ratio is a geometrical proportion close to 85/58. Its true value is the real solution of the equation x3 = x2 + 1.
     */
    supergolden_ratio: number;
    /**
     * In plane geometry, the Kepler–Bouwkamp constant is obtained as a limit of the following sequence. Take a circle of radius
     * 1. Inscribe a regular triangle in this circle.
     * 2. Inscribe a circle in this triangle.
     * 3. Inscribe a square in it. Inscribe a circle, regular pentagon, circle, regular hexagon
     */
    kepler_bouwkamp: number;
    wallis_constant: number;
    /**
     * The number e is a mathematical constant approximately equal to 2.71828 that can be characterized in many ways. It is the base of natural logarithms. It is the limit of (1 + 1/n)n
     */
    euler_number: number;
    /**
     * [Lemniscate constant](https://www.wikiwand.com/en/Lemniscate_constant) - In mathematics, the lemniscate constant ϖ is a transcendental mathematical constant that is the ratio of the perimeter of Bernoulli's lemniscate to its diameter...
     */
    lemniscate_costant: number;
    /**
     * [Euler's constant](https://www.wikiwand.com/en/Euler's_constant) - is a mathematical constant, usually denoted by the lowercase Greek letter gamma, defined as the limiting difference between the harmonic series and the natural logarithm...:
     */
    eulers_constant: number;
    /**
     * The [Erdős–Borwein constant](https://www.wikiwand.com/en/Erd%C5%91s%E2%80%93Borwein_constant) is the sum of the reciprocals of the Mersenne numbers. It is named after Paul Erdős and Peter Borwein.
     */
    erdos_borwein_constant: number;
    /**
     * [Omega constant](https://www.wikiwand.com/en/Omega_constant) - The omega constant is a mathematical constant defined as the unique real number that satisfies the equation
     */
    omega_constant: number;
    /**
     * [Apéry's constant](https://www.wikiwand.com/en/Ap%C3%A9ry's_constant) - In mathematics, Apéry's constant is the sum of the reciprocals of the positive cubes. That is, it is defined as the number
     */
    apery_constant: number;
    /**
     * In mathematics, the Laplace limit is the maximum value of the eccentricity for which a solution to Kepler's equation, in terms of a power series in the eccentricity, converges. It is approximately 0.66274 34193 49181 58097 47420 97109 25290.
     */
    laplace_limit: number;
    /**
     * In mathematics, the Ramanujan–Soldner constant is a mathematical constant defined as the unique positive zero of the logarithmic integral function. It is named after Srinivasa Ramanujan and Johann Georg von Soldner.
     */
    ramanujan_soldner_constant: number;
    /**
     * Gauss's constant, denoted by G, is equal to ϖ (lemniscate constant) / π ≈ 0.8346268
     */
    gauss_constant: number;
    /**
     * In mathematics, the Hermite constant, named after Charles Hermite, determines how long a shortest element of a lattice in Euclidean space can be.
     */
    second_hermite_constant: number;
    /**
     * [Glaisher–Kinkelin constant](https://www.wikiwand.com/en/Glaisher%E2%80%93Kinkelin_constant) - In mathematics, the Glaisher–Kinkelin constant or Glaisher's constant, typically denoted A, is a mathematical constant, related to the K-function...;
     */
    glaisher_kinkelin_constant: number;
    /**
     * [Catalan's constant](https://www.wikiwand.com/en/Catalan's_constant) - In mathematics, Catalan's constant G, is defined by
     */
    catalan_constant: number;
    /**
     * In mathematics, the Dottie number is a constant that is the unique real root of the equation,
     */
    dottie_number: number;
    /**
     * The Meissel–Mertens constant, also referred to as Mertens constant, Kronecker's constant, Hadamard–de la Vallée-Poussin constant or the prime reciprocal constant, is a mathematical constant in number theory...
     */
    meissel_mertens_constant: number;
    /**
     * [Universal parabolic constant](https://www.wikiwand.com/en/Universal_parabolic_constant) - The universal parabolic constant is a mathematical constant.
     */
    universal_parabolic_constant: number;
    /**
     * [Cahen's constant](https://www.wikiwand.com/en/Cahen's_constant) - In mathematics, Cahen's constant is defined as the value of an infinite series of unit fractions with alternating signs...
     */
    cahen_constant: number;
    /**
     * [Gelfond's constant](https://www.wikiwand.com/en/Gelfond's_constant) - In mathematics, Gelfond's constant, named after Aleksandr Gelfond, is eπ, that is, e raised to the power π;
     */
    gelfond_constant: number;
    /**
     * [Gelfond–Schneider constant](https://www.wikiwand.com/en/Gelfond%E2%80%93Schneider_constant) - The Gelfond–Schneider constant or Hilbert number is two to the power of the square root of two: 2√2 = 2.665144142690225188650
     */
    gelfond_schneider_constant: number;
    /**
     * [Second Favard constant]() - In mathematics, the Favard constant, also called the
     * Akhiezer–Krein–Favard constant, of order r is defined as
     */
    second_favard_constant: number;
    /**
     * [Golden angle](https://www.wikiwand.com/en/Golden_angle) - In geometry, the golden angle is the smaller of the two angles created by sectioning the circumference of a circle according to the golden ratio
     */
    golden_angle: number;
  };

  physical: {
    /**
     * The speed of light in vacuum, commonly denoted c, is a universal physical constant that is exactly equal to 299,792,458 metres per second
     */
    speed_of_light_in_vacuum: number;
    /**
     * The gravity of Earth, denoted by g, is the net acceleration that is imparted to objects due to the combined effect of gravitation (from mass distribution within Earth) and the centrifugal force (from the Earth's rotation)
     */
    gravitational_acceleration_constant: number;
    /**
     * The precise strength of Earth's gravity varies with location. The agreed upon value for standard gravity is 9.80665 m/s2 (32.1740 ft/s2) by definition.
     */
    standard_gravitational_acceleration_constant: number;
    /**
     * The Planck constant, or Planck's constant, is a fundamental physical constant of foundational importance in quantum mechanics
     */
    planck_constant: number;
    /**
     * The Boltzmann constant (kB or k) is the proportionality factor that relates the average relative thermal energy of particles in a gas with the thermodynamic temperature of the gas.
     */
    boltzman_constant: number;
    /**
     * The gravitational constant (also known as the universal gravitational constant, the Newtonian constant of gravitation, denoted by the capital letter G, is an empirical physical constant involved in the calculation of gravitational effects...
     */
    gravitational_constant: number;
    /**
     * Coulomb's inverse-square law, or simply Coulomb's law, is an experimental law[1] of physics that calculates the amount of force between two electrically charged particles at rest.
     */
    coulombs_constant: number;
    /**
     * In cosmology (usually denoted by the Greek capital letter lambda: Λ), also called Einstein's cosmological constant, is the constant coefficient of a term that Albert Einstein temporarily added to his field equations of general relativity.
     */
    cosmological_constant: number;
    /**
     * The elementary charge, usually denoted by e, is a fundamental physical constant, defined as the electric charge carried by a single proton or, equivalently, the magnitude of the negative electric charge carried by a single electron
     */
    elementary_charge: number;
    /**
     * In particle physics, the electron mass (symbol: me) is the mass of a stationary electron, also known as the invariant mass of the electron. It is one of the fundamental constants of physics.
     */
    electron_mass: number;
    /**
     * A proton is a stable subatomic particle, symbol p, H+, or 1H+ with a positive electric charge of +1 e (elementary charge). Its mass is slightly less than that of a neutron and 1,836 times the mass of an electron
     */
    proton_mass: number;
    /**
     * The neutron is a subatomic particle, symbol n or n0, which has a neutral (not positive or negative) charge, and a mass slightly greater than that of a proton
     */
    neutron_mass: number;
    /**
     * It is defined as the number of constituent particles (usually molecules, atoms, or ions) per mole (SI unit) and used as a normalization factor in the amount of substance in a sample.
     */
    avogadro_constant: number;
    /**
     * In physical chemistry, the Faraday constant (symbol F, sometimes stylized as ℱ) is a physical constant defined as the quotient of the total electric charge (q) by the amount (n) of elementary charge carriers in any given sample of matte
     */
    faraday_constant: number;
  };
};

export { BreadrollOpen, DataframeReadOptions, IOSave, Condition, FilterType, ObjectType, EscapeSeq, Indexer, NumericConstantType, Apply };
